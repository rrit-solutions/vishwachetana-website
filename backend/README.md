# Gallery API (local MySQL)

## Local setup

1. Create a local MySQL database named `vishwachetana` (or use your chosen `MYSQL_DATABASE`).
2. Run `migrations/001_create_gallery_images.sql` against that database.
3. Copy `.env.example` to `.env` and enter the local MySQL credentials.
4. Start the API with `npm run dev`.

Gallery uploads are resized to fit within 2560 × 2560 pixels and stored as compressed WebP image data in MySQL. The API exposes each image at `/api/gallery/:id/image`; no Cloudinary account is required.

## Environment variables

- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`: MySQL connection details
- `API_PORT`: local API port (defaults to `5000`)
- `FRONTEND_URL`: the published frontend URL (multiple URLs may be comma-separated)
- `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`

For local frontend development, set `VITE_API_URL=http://localhost:5000/api` in the frontend `.env`.
