import { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const API_URL = "http://localhost:5000/api/gallery";
const SERVER_URL = "http://localhost:5000";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(API_URL);
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
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
    return <div className="gallery-page-loading">Loading gallery...</div>;
  }

  return (
    <main className="gallery-page">
      <section className="gallery-page__hero">
        <p className="gallery-page__eyebrow">Visual Showcase</p>
        <h1>Gallery</h1>
        <p className="gallery-page__subtitle">
          A dynamic collection of gem and showroom visuals, automatically built
          from your latest uploaded content.
        </p>
      </section>

      <section className="gallery-page__content">
        <div className="gallery-masonry">
          {items.map((item, index) => (
            <article
              className={`gallery-tile ${index % 5 === 0 ? "gallery-tile--large" : ""}`}
              key={`${item.type}-${item._id}`}
            >
              <img src={getImageUrl(item.image)} alt={item.title} />

              <div className="gallery-tile__overlay">
                <span className="gallery-tile__badge">{item.type}</span>
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="gallery-empty-state">
            <h2>No gallery items available yet</h2>
            <p>
              Add gem images and showroom images from the admin panel to build
              the gallery automatically.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}