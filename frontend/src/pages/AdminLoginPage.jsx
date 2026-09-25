import { useState } from "react";
import { ImagePlus, LockKeyhole } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { request } from "../api";

const TOKEN_KEY = "vishwachetana_admin_token";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (sessionStorage.getItem(TOKEN_KEY))
    return <Navigate to="/admin/gallery" replace />;

  async function signIn(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setMessage("");
    try {
      const result = await request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      sessionStorage.setItem(TOKEN_KEY, result.token);
      navigate("/admin/gallery", { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="admin-gallery admin-login-page"><section className="admin-login-panel"><div className="admin-login-intro"><span className="admin-login-icon"><ImagePlus size={25} aria-hidden="true" /></span><p className="eyebrow">Staff access</p><h1>Manage the gallery</h1><p>Sign in to add, organise, and remove gallery images.</p></div><form className="admin-card admin-login-card" onSubmit={signIn}><label>Email address<input type="email" name="email" placeholder="name@example.com" required autoComplete="username" /></label><label>Password<input type="password" name="password" placeholder="Enter your password" required autoComplete="current-password" /></label><button className="admin-login-submit" type="submit" disabled={submitting}><LockKeyhole size={18} aria-hidden="true" /> {submitting ? "Signing in…" : "Sign in"}</button>{message && <p className="admin-login-message" role="alert">{message}</p>}</form></section></main>;
}
