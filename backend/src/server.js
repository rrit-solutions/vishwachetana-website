import "dotenv/config";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import mysql from "mysql2/promise";
import sharp from "sharp";

const required = [
  "MYSQL_DATABASE",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length)
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );

const app = express();
const port = Number(process.env.API_PORT || process.env.PORT || 5000);
app.set("trust proxy", 1);
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",").map((url) => url.trim()),
    methods: ["GET", "POST", "DELETE"],
  }),
);
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_request, file, callback) =>
    callback(null, file.mimetype.startsWith("image/")),
});

function requireAdmin(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token)
    return response
      .status(401)
      .json({ message: "Authentication is required." });
  try {
    request.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return response
      .status(401)
      .json({ message: "Your session has expired. Please sign in again." });
  }
}

async function compressImage(buffer) {
  return sharp(buffer, { failOn: "error", limitInputPixels: 80_000_000 })
    .rotate()
    .resize({
      width: 2560,
      height: 2560,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
}

function imageUrl(request, id) {
  return `${request.protocol}://${request.get("host")}/api/gallery/${id}/image`;
}

function galleryItem(request, row) {
  return {
    id: row.id,
    image_url: imageUrl(request, row.id),
    category: row.category,
    caption: row.caption,
    created_at: row.created_at,
  };
}

app.get("/api/health", async (_request, response, next) => {
  try {
    await pool.execute("SELECT 1");
    response.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", (request, response) => {
  const { email, password } = request.body;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return response
      .status(401)
      .json({ message: "Incorrect email or password." });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  return response.json({ token });
});

app.get("/api/gallery", async (request, response, next) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, category, caption, created_at FROM gallery_images ORDER BY created_at DESC",
    );
    response.json(rows.map((row) => galleryItem(request, row)));
  } catch (error) {
    next(error);
  }
});

app.post(
  "/api/gallery",
  requireAdmin,
  upload.single("image"),
  async (request, response, next) => {
    if (!request.file)
      return response
        .status(400)
        .json({ message: "Please select an image smaller than 10 MB." });
    const category = request.body.category?.trim() || "General";
    const caption = request.body.caption?.trim() || null;
    try {
      const imageData = await compressImage(request.file.buffer);
      if (imageData.length > 10 * 1024 * 1024)
        return response
          .status(400)
          .json({ message: "Compressed image is too large." });
      const [result] = await pool.execute(
        "INSERT INTO gallery_images (image_data, image_mime_type, category, caption) VALUES (?, ?, ?, ?)",
        [imageData, "image/webp", category, caption],
      );
      const [rows] = await pool.execute(
        "SELECT id, category, caption, created_at FROM gallery_images WHERE id = ?",
        [result.insertId],
      );
      response.status(201).json(galleryItem(request, rows[0]));
    } catch (error) {
      next(error);
    }
  },
);

app.get("/api/gallery/:id/image", async (request, response, next) => {
  try {
    const [rows] = await pool.execute(
      "SELECT image_data, image_mime_type FROM gallery_images WHERE id = ?",
      [request.params.id],
    );
    if (!rows[0]) return response.status(404).end();
    response.set({
      "Content-Type": rows[0].image_mime_type,
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    return response.send(rows[0].image_data);
  } catch (error) {
    return next(error);
  }
});

app.delete(
  "/api/gallery/:id",
  requireAdmin,
  async (request, response, next) => {
    try {
      const [result] = await pool.execute(
        "DELETE FROM gallery_images WHERE id = ?",
        [request.params.id],
      );
      if (!result.affectedRows)
        return response.status(404).json({ message: "Image not found." });
      return response.status(204).end();
    } catch (error) {
      return next(error);
    }
  },
);

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error instanceof multer.MulterError)
    return response
      .status(400)
      .json({ message: "Image must be 10 MB or smaller." });
  return response
    .status(500)
    .json({ message: "Something went wrong. Please try again." });
});

app.listen(port, () => console.log(`Gallery API listening on port ${port}`));
