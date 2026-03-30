import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GemDetails.css";

const API_URL = "http://localhost:5000/api/gems";
const SERVER_URL = "http://localhost:5000";

export default function GemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gem, setGem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setGem(response.data);
      } catch (error) {
        console.error("Failed to fetch gem details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGem();
  }, [id]);

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
    return <div className="details-loading">Loading gem details...</div>;
  }

  if (!gem) {
    return <div className="details-loading">Gem not found.</div>;
  }

  return (
    <main className="gem-details">
      <div className="gem-details__container">
        <div className="gem-details__image">
          <img src={getImageUrl(gem.image)} alt={gem.name} />
        </div>

        <div className="gem-details__content">
          <span className="gem-details__category">{gem.category}</span>
          <h1>{gem.name}</h1>
          <p className="gem-details__description">{gem.description}</p>
          <div className="gem-details__price">${gem.price}</div>

          <div className="gem-details__actions">
            <button
              className="gem-details__btn gem-details__btn--secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              className="gem-details__btn gem-details__btn--primary"
              type="button"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}