import { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, buildAssetUrl } from "../config";
import "./ShowRooms.css";

const API_URL = buildApiUrl("/api/showrooms");

export default function ShowRooms() {
  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        const response = await axios.get(API_URL);
        setShowrooms(response.data);
      } catch (error) {
        console.error("Failed to fetch showrooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowrooms();
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
    return <div className="showroom-page-loading">Loading show rooms...</div>;
  }

  return (
    <main className="showroom-page">
      <section className="showroom-page__hero">
        <p className="showroom-page__eyebrow">Visit Our Locations</p>
        <h1>Show Rooms</h1>
        <p className="showroom-page__subtitle">
          Explore our showroom locations and experience the elegance of Nulan
          Gems in person.
        </p>
      </section>

      <section className="showroom-page__content">
        <div className="showroom-grid">
          {showrooms.map((item) => (
            <article className="showroom-card" key={item._id}>
              <div className="showroom-card__image-wrap">
                <img src={getImageUrl(item.image)} alt={item.name} />
              </div>

              <div className="showroom-card__body">
                <h2>{item.name}</h2>
                <p className="showroom-card__address">{item.address}</p>
                <p className="showroom-card__phone">{item.phone}</p>
                <p className="showroom-card__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {showrooms.length === 0 && (
          <div className="showroom-empty-state">
            <h2>No show rooms available yet</h2>
            <p>Please add show rooms from the admin panel.</p>
          </div>
        )}
      </section>
    </main>
  );
}

