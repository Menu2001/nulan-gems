import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">◆</span>
          <span className="navbar__brand-text">Nulan Gems</span>
        </Link>

        <nav className="navbar__nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/gem-collection">Gem Collection</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/show-rooms">Show Rooms</NavLink>
          <NavLink to="/certifications">Certifications</NavLink>
          <NavLink to="/our-company">Our Company</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </nav>
      </div>
    </header>
  );
}