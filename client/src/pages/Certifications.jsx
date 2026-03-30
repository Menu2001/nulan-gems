import { useEffect, useState } from "react";
import axios from "axios";
import "./Certifications.css";

const API_URL = "http://localhost:5000/api/certifications";
const SERVER_URL = "http://localhost:5000";

export default function Certifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(API_URL);
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/600x400?text=No+Image";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${SERVER_URL}${imagePath}`;
  };

  if (loading) {
    return <div className="cert-page-loading">Loading certifications...</div>;
  }

  return (
    <main className="cert-page">
      <section className="cert-page__hero">
        <p className="cert-page__eyebrow">Trust & Authenticity</p>
        <h1>Certifications</h1>
        <p className="cert-page__subtitle">
          Discover the certifications and quality assurances that reflect the
          credibility and professional standards of Nulan Gems.
        </p>
      </section>

      <section className="cert-page__content">
        <div className="cert-grid">
          {items.map((item) => (
            <article className="cert-card" key={item._id}>
              <div className="cert-card__image-wrap">
                <img src={getImageUrl(item.image)} alt={item.title} />
              </div>

              <div className="cert-card__body">
                <span className="cert-card__issuer">{item.issuer}</span>
                <h2>{item.title}</h2>
                <p className="cert-card__date">Issued: {item.issuedDate}</p>
                <p className="cert-card__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="cert-empty-state">
            <h2>No certifications available yet</h2>
            <p>Please add certifications from the admin panel.</p>
          </div>
        )}
      </section>
    </main>
  );
}