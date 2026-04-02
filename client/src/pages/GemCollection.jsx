import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { buildApiUrl, buildAssetUrl } from "../config";
import "./GemCollection.css";

const API_URL = buildApiUrl("/api/gems");

export default function GemCollection() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await axios.get(API_URL);
        setGems(response.data);
      } catch (error) {
        console.error("Failed to fetch gems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGems();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/600x400?text=No+Image";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return buildAssetUrl(imagePath);
  };

  if (loading) {
    return <div className="gem-page-loading">Loading gems...</div>;
  }

  return (
    <main className="gem-page">
      <section className="gem-page__hero">
        <p className="gem-page__eyebrow">Natural Elegance</p>
        <h1>Gem Collection</h1>
        <p className="gem-page__subtitle">
          Discover our curated gemstone selection presented with luxury,
          clarity, and timeless visual appeal.
        </p>
      </section>

      <section className="gem-page__content">
        <div className="gem-grid">
          {gems.map((gem) => (
            <article className="gem-card" key={gem._id}>
              <div className="gem-card__image-wrap">
                <img src={getImageUrl(gem.image)} alt={gem.name} />
              </div>

              <div className="gem-card__body">
                <span className="gem-card__category">{gem.category}</span>
                <h2>{gem.name}</h2>
                <p>{gem.description}</p>
                <div className="gem-card__footer">
                  <strong>${gem.price}</strong>
                  <button
                    type="button"
                    onClick={() => navigate(`/gem/${gem._id}`)}
                  >
                    View Gem
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {gems.length === 0 && (
          <div className="gem-empty-state">
            <h2>No gems available yet</h2>
            <p>Please add gems from the admin panel.</p>
          </div>
        )}
      </section>
    </main>
  );
}

