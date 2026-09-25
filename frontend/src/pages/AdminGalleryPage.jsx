import { useEffect, useState } from "react";
import { LogOut, Trash2, Upload } from "lucide-react";
import { Navigate } from "react-router-dom";
import { request } from "../api";

const TOKEN_KEY = "vishwachetana_admin_token";
export default function AdminGalleryPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [items, setItems] = useState([]), [message, setMessage] = useState(""), [loading, setLoading] = useState(Boolean(token)), [submitting, setSubmitting] = useState(false);
  const loadItems = async () => { setLoading(true); try { setItems(await request("/gallery")); } catch (e) { setMessage(e.message); } finally { setLoading(false); } };
  useEffect(() => { if (token) loadItems(); }, [token]);
  async function uploadImage(event) { event.preventDefault(); setSubmitting(true); setMessage(""); try { await request("/gallery", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: new FormData(event.currentTarget) }); event.currentTarget.reset(); setMessage("Image uploaded successfully."); await loadItems(); } catch (e) { setMessage(e.message); } finally { setSubmitting(false); } }
  async function deleteImage(id) { if (!window.confirm("Permanently delete this image?")) return; setMessage(""); try { await request(`/gallery/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); setItems((current) => current.filter((item) => item.id !== id)); } catch (e) { setMessage(e.message); } }
  function signOut() { sessionStorage.removeItem(TOKEN_KEY); setToken(null); setItems([]); }
  if (!token) return <Navigate to="/admin/login" replace />;
  return <main className="admin-gallery"><section><div className="admin-heading"><div><p className="eyebrow">Staff access</p><h1>Manage gallery</h1></div><button type="button" className="admin-secondary" onClick={signOut}><LogOut size={17} /> Sign out</button></div><form className="admin-card" onSubmit={uploadImage}><label>Image<input type="file" name="image" accept="image/*" required /></label><label>Category<input type="text" name="category" placeholder="e.g. Sports" maxLength="100" /></label><label>Caption<input type="text" name="caption" placeholder="Describe this photo" /></label><button type="submit" disabled={submitting}><Upload size={17} /> {submitting ? "Uploading…" : "Upload image"}</button></form>{message && <p className="admin-message" role="status">{message}</p>}{loading ? <p>Loading images…</p> : <div className="admin-image-list">{items.map((item) => <article key={item.id}><img src={item.image_url} alt="" /><div><small>{item.category}</small><strong>{item.caption || "Untitled image"}</strong></div><button type="button" className="admin-delete" onClick={() => deleteImage(item.id)} aria-label={`Delete ${item.caption || "image"}`}><Trash2 size={18} /> Delete</button></article>)}</div>}</section></main>;
}
