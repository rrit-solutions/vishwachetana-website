export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message || "Request failed. Please try again.");
  return body;
}
