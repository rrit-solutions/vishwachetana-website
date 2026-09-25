import { useEffect, useState } from "react";
import { Expand, Images, X } from "lucide-react";
import { request } from "../api";
import { SectionHeading } from "../components/Layout";

export default function GalleryPage() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { request("/gallery").then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { const close = (event) => event.key === "Escape" && setSelected(null); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, []);
  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const visibleItems = category === "All" ? items : items.filter((item) => item.category === category);
  return <main>
    <section className="page-hero gallery-hero"><img src="/assets/gallery/VCV  SELECTED - 2025-26/VCV SHCOOL/A-98.JPG" alt="Vishwachetana students and campus life" /><div className="page-hero-copy"><p className="eyebrow">Our Gallery</p><h1>Moments that shape the Chetana experience</h1><p>Explore learning, achievement, community, sports, wellness, and residential life across our institutions.</p></div></section>
    <section className="section gallery-section">
      <SectionHeading eyebrow="Life at Chetana" title="A closer look at our vibrant community" />
      <div className="gallery-toolbar reveal"><div className="gallery-count"><Images size={20} aria-hidden="true" /><span>{visibleItems.length} moments</span></div><div className="gallery-filters" aria-label="Filter gallery">{categories.map((item) => <button type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>
      {loading && <p className="gallery-message">Loading gallery…</p>}
      {error && <p className="gallery-message" role="alert">Unable to load the gallery: {error}</p>}
      {!loading && !error && visibleItems.length === 0 && <p className="gallery-message">No photos have been added yet.</p>}
      <div className="modern-gallery">{visibleItems.map((item) => <button className="gallery-tile" type="button" onClick={() => setSelected(item)} key={item.id}><img src={item.image_url} alt={item.caption || item.category} loading="lazy" /><span className="gallery-tile-overlay"><span><small>{item.category}</small><strong>{item.caption || "Vishwachetana moment"}</strong></span><span className="gallery-expand"><Expand size={19} aria-hidden="true" /></span></span></button>)}</div>
    </section>
    {selected && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selected.caption || selected.category} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><button type="button" className="gallery-lightbox-close" aria-label="Close image" onClick={() => setSelected(null)}><X size={24} aria-hidden="true" /></button><figure><img src={selected.image_url} alt={selected.caption || selected.category} /><figcaption><small>{selected.category}</small><strong>{selected.caption || "Vishwachetana moment"}</strong></figcaption></figure></div>}
  </main>;
}
