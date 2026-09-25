import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUp,
  ChevronDown,
  Camera,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  LogIn,
  ThumbsUp,
  X,
} from "lucide-react";
import { institutions } from "../data";
import {
  AboutNavItem,
  CampusNavItem,
  ContactNavItem,
  GalleryNavItem,
  HomeNavItem,
  InstitutionsNavItem,
  PlacementsNavItem,
} from "./navigation/NavItems";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const close = (event) =>
      !dropdownRef.current?.contains(event.target) && setDropdownOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <Link
          className="brand"
          to="/"
          aria-label="Vishwachetana Vidyaniketana home"
          onClick={closeAll}
        >
          <img
            className="brand-logo"
            src="/assets/logo.jpg"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-text">
            <strong>
              Vishwachetana Vidyaniketana<sup>®</sup>
            </strong>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <HomeNavItem onNavigate={closeAll} />
          <AboutNavItem onNavigate={closeAll} />
          <div
            className={`nav-dropdown ${dropdownOpen ? "is-open" : ""}`}
            ref={dropdownRef}
          >
            <span className="dropdown-toggle">
              <InstitutionsNavItem onNavigate={closeAll} />
              <button
                type="button"
                aria-label="Toggle institution menu"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <ChevronDown size={17} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </span>
            <div className="dropdown-menu">
              {institutions.map((item) => (
                <NavLink key={item.path} to={item.path} onClick={closeAll}>
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
          <CampusNavItem onNavigate={closeAll} />
          <GalleryNavItem onNavigate={closeAll} />
          <PlacementsNavItem onNavigate={closeAll} />
          <ContactNavItem onNavigate={closeAll} />
          <Link
            className="header-admin-login"
            to="/admin/login"
            onClick={closeAll}
          >
            <LogIn size={16} aria-hidden="true" />
            login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link
            className="footer-brand"
            to="/"
            aria-label="Vishwachetana Vidyaniketana home"
          >
            <img
              className="footer-logo"
              src="/assets/logo.jpg"
              alt=""
              aria-hidden="true"
            />
            <strong>
              Vishwachetana
              <br />
              Vidyaniketana
            </strong>
          </Link>
          <p>
            We provide top-notch education services. Join us and explore a world
            of knowledge.
          </p>
          <div className="footer-socials" aria-label="Social media">
            <span aria-label="Facebook">
              <ThumbsUp size={20} aria-hidden="true" />
            </span>
            <span aria-label="YouTube">
              <Play size={20} aria-hidden="true" />
            </span>
            <span aria-label="Instagram">
              <Camera size={20} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="footer-contact">
          <h2>Get in Touch</h2>
          <a href="tel:+918105798570">
            <Phone size={19} aria-hidden="true" /> +91 81057 98570
          </a>
          <a href="mailto:info@chetana.com">
            <Mail size={19} aria-hidden="true" /> info@chetana.com
          </a>
          <address>
            <MapPin size={20} aria-hidden="true" />{" "}
            <span>NH 48, Vidyanagar, Davanagere, Karnataka 577005</span>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 <span>Chetana Group of Institutions.</span> All rights
          reserved.
        </p>
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={22} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export function RevealManager() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
  return null;
}

export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <RevealManager />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
