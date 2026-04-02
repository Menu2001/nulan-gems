import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { buildApiUrl, buildAssetUrl } from "../config";
import "./Navbar.css";

const API_URL = buildApiUrl("/api/company");

export default function Navbar() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(API_URL);
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to load company brand:", error);
      }
    };

    fetchCompany();
  }, []);

  const logoUrl = company?.logo ? buildAssetUrl(company.logo) : "";

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          {logoUrl ? (
            <img src={logoUrl} alt="Company Logo" className="navbar__brand-logo" />
          ) : (
            <span className="navbar__brand-mark">◆</span>
          )}

          <span className="navbar__brand-text">
            {company?.companyName || "Nulan Gems"}
          </span>
        </Link>

        <nav className="navbar__nav">
          <NavLink to="/" end>Home</NavLink>
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

