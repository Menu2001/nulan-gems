import { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, buildAssetUrl } from "../config";
import "./OurCompany.css";

const API_URL = buildApiUrl("/api/company");

export default function OurCompany() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(API_URL);
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const logoUrl = company?.logo ? buildAssetUrl(company.logo) : "";

  if (loading) {
    return <div className="company-page-loading">Loading company details...</div>;
  }

  return (
    <main className="company-page">
      <section className="company-page__hero">
        {logoUrl && (
          <img src={logoUrl} alt="Company Logo" className="company-page__logo" />
        )}

        <p className="company-page__eyebrow">About Us</p>
        <h1>{company?.companyName || "Nulan Gems"}</h1>
        <p className="company-page__subtitle">
          Discover the story, mission, and vision behind our gemstone brand.
        </p>
      </section>

      <section className="company-page__content">
        <div className="company-grid">
          <article className="company-card company-card--wide">
            <h2>Our Company</h2>
            <p>{company?.aboutText}</p>
          </article>

          <article className="company-card">
            <h2>Vision</h2>
            <p>{company?.vision}</p>
          </article>

          <article className="company-card">
            <h2>Mission</h2>
            <p>{company?.mission}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

