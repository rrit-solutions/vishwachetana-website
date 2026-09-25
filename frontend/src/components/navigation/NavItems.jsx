import { NavLink } from "react-router-dom";

function Item({ to, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) => (isActive ? "active" : undefined)}
    >
      {children}
    </NavLink>
  );
}

export const HomeNavItem = ({ onNavigate }) => (
  <Item to="/" onNavigate={onNavigate}>
    Home
  </Item>
);
export const AboutNavItem = ({ onNavigate }) => (
  <Item to="/about" onNavigate={onNavigate}>
    About Us
  </Item>
);
export const InstitutionsNavItem = ({ onNavigate }) => (
  <Item to="/institutions" onNavigate={onNavigate}>
    Our Institutions
  </Item>
);
export const CampusNavItem = ({ onNavigate }) => (
  <Item to="/campus-life" onNavigate={onNavigate}>
    Campus Life
  </Item>
);
export const GalleryNavItem = ({ onNavigate }) => (
  <Item to="/gallery" onNavigate={onNavigate}>
    Gallery
  </Item>
);
export const PlacementsNavItem = ({ onNavigate }) => (
  <Item to="/placements" onNavigate={onNavigate}>
    Placements
  </Item>
);
export const ContactNavItem = ({ onNavigate }) => (
  <Item to="/contact" onNavigate={onNavigate}>
    Contact Us
  </Item>
);
