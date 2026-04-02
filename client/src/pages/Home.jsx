import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ScrollReveal from "../components/ScrollReveal";
import { buildApiUrl, buildAssetUrl } from "../config";
import "./Home.css";

const API_URL = buildApiUrl("/api/homepage");

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const response = await axios.get(API_URL);
        setHomeData(response.data);
      } catch (error) {
        console.error("Failed to load homepage data:", error);
      }
    };

    fetchHomepage();
  }, []);

  useEffect(() => {
    if (!homeData?.heroImages?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeData.heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [homeData]);

  const theme = useMemo(() => {
    return {
      primaryColor: homeData?.theme?.primaryColor || "#0f172a",
      secondaryColor: homeData?.theme?.secondaryColor || "#1e293b",
      accentColor: homeData?.theme?.accentColor || "#d4af37",
      textColor: homeData?.theme?.textColor || "#ffffff",
      backgroundColor: homeData?.theme?.backgroundColor || "#020617",
    };
  }, [homeData]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--accent-color", theme.accentColor);
    root.style.setProperty("--text-color", theme.textColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
  }, [theme]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/1600x900?text=Nulan+Gems";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return buildAssetUrl(imagePath);
  };

  if (!homeData) {
    return <div className="home-loading">Loading homepage...</div>;
  }

  const currentImage =
    homeData.heroImages?.length > 0
      ? getImageUrl(homeData.heroImages[currentSlide])
      : "https://via.placeholder.com/1600x900?text=Nulan+Gems";

  return (
    <main className="home-page">
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.55), rgba(2, 6, 23, 0.78)), url(${currentImage})`,
        }}
      >
        <div className="hero__bg-orb hero__bg-orb--one" />
        <div className="hero__bg-orb hero__bg-orb--two" />

        <div className="hero__content">
          <p className="hero__eyebrow">Certified Luxury Gemstones</p>
          <h1>{homeData.heroTitle}</h1>
          <p className="hero__subtitle">{homeData.heroSubtitle}</p>

          <div className="hero__actions">
            <a className="hero__button hero__button--primary" href={homeData.heroButtonLink}>
              {homeData.heroButtonText}
            </a>
            <a className="hero__button hero__button--secondary" href="/gallery">
              View Gallery
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <h3>Premium</h3>
              <p>Natural gemstone selection</p>
            </div>
            <div className="hero__stat">
              <h3>Trusted</h3>
              <p>Quality-focused presentation</p>
            </div>
            <div className="hero__stat">
              <h3>Elegant</h3>
              <p>Luxury visual experience</p>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="section__header">
            <p className="section__eyebrow">Featured Selection</p>
            <h2>Gem Collection</h2>
            <p className="section__text">
              Explore a refined collection of gemstones presented with elegance,
              detail, and premium visual appeal.
            </p>
          </div>

          <div className="card-grid">
            {homeData.featuredGems?.map((gem, index) => (
              <ScrollReveal key={gem._id} delay={index * 120}>
                <article className="card">
                  <div className="card__image-wrap">
                    <img src={getImageUrl(gem.image)} alt={gem.name} />
                  </div>

                  <div className="card__body">
                    <span className="card__tag">Natural Gem</span>
                    <h3>{gem.name}</h3>
                    <p>{gem.description}</p>
                    <button className="card__button">View Details</button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section section--highlight">
          <div className="section__header">
            <p className="section__eyebrow">Visual Showcase</p>
            <h2>Gallery Preview</h2>
            <p className="section__text">
              A carefully styled visual window into the brilliance and character
              of the Nulan Gems collection.
            </p>
          </div>

          <div className="gallery-grid">
            {homeData.galleryPreview?.map((item, index) => (
              <ScrollReveal key={item._id || index} delay={index * 120}>
                <div className="gallery-item">
                  <img src={getImageUrl(item.image)} alt="Nulan Gems gallery preview" />
                  <div className="gallery-item__overlay">
                    <span>Luxury Collection</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="section__header">
            <p className="section__eyebrow">Who We Are</p>
            <h2>Our Company</h2>
            <p className="section__text">
              A modern gemstone brand presentation focused on trust, elegance, and
              premium quality.
            </p>
          </div>

          <ScrollReveal delay={150}>
            <div className="company-box">
              <p>{homeData.companyIntro}</p>
            </div>
          </ScrollReveal>
        </section>
      </ScrollReveal>
    </main>
  );
}

