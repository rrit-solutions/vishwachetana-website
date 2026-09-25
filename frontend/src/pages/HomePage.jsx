import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Hero, Stats } from "../components/HomeSections";

export default function HomePage() {
  return <main id="home"><Hero/><a className="whatsapp" href="https://wa.me/918105798570" aria-label="Chat on WhatsApp"><MessageCircle size={27} aria-hidden="true" /></a>
    <section className="service-card"><div><p className="eyebrow">Welcome to Chetana</p><h2>Provide Best <span>Education Services</span></h2><p>Disciplined academics, personal attention, competitive exam preparation, and career-focused guidance prepare young minds for success, confidence, and integrity.</p><div className="service-actions"><Link className="btn primary" to="/contact">Enquire Now</Link><Link className="btn outline" to="/institutions">View Programs</Link></div></div><div className="notice-panel"><strong>Admissions Open</strong><span>School, PU College, residential and skill-focused pathways for 2026-27.</span></div></section>
    <Stats/>
    <section className="section brochure-section"><div className="brochure-copy reveal"><p className="eyebrow">Explore Vishwachetana</p><h2>Education for every stage of the student journey</h2><p>Learn about our approach, academic institutions, campus experience, placements, and admission support through their dedicated pages.</p></div><div className="development-card reveal"><h3>Quick Links</h3><ul><li><Link to="/about">About the institution</Link></li><li><Link to="/institutions">Browse programs</Link></li><li><Link to="/campus-life">Experience campus life</Link></li><li><Link to="/placements">Explore career support</Link></li></ul></div></section>
  </main>;
}
