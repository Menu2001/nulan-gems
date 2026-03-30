import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/homepage";

export default function HomepageManager() {
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroButtonText: "",
    heroButtonLink: "",
    companyIntro: "",
    theme: {
      primaryColor: "#0f172a",
      secondaryColor: "#1e293b",
      accentColor: "#d4af37",
      textColor: "#ffffff",
      backgroundColor: "#020617"
    }
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;

        setFormData({
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          heroButtonText: data.heroButtonText || "",
          heroButtonLink: data.heroButtonLink || "",
          companyIntro: data.companyIntro || "",
          theme: {
            primaryColor: data.theme?.primaryColor || "#0f172a",
            secondaryColor: data.theme?.secondaryColor || "#1e293b",
            accentColor: data.theme?.accentColor || "#d4af37",
            textColor: data.theme?.textColor || "#ffffff",
            backgroundColor: data.theme?.backgroundColor || "#020617"
          }
        });
      } catch (error) {
        console.error("Failed to fetch homepage:", error);
      }
    };

    fetchHomepage();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("theme.")) {
      const themeField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        theme: {
          ...prev.theme,
          [themeField]: value
        }
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      await axios.put(API_URL, formData);
      setStatus("Homepage updated successfully.");
    } catch (error) {
      console.error("Failed to update homepage:", error);
      setStatus("Failed to update homepage.");
    }
  };

  return (
    <div>
      <h1>Homepage Manager</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Hero Title
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
          />
        </label>

        <label>
          Hero Subtitle
          <textarea
            name="heroSubtitle"
            rows="3"
            value={formData.heroSubtitle}
            onChange={handleChange}
          />
        </label>

        <label>
          Hero Button Text
          <input
            type="text"
            name="heroButtonText"
            value={formData.heroButtonText}
            onChange={handleChange}
          />
        </label>

        <label>
          Hero Button Link
          <input
            type="text"
            name="heroButtonLink"
            value={formData.heroButtonLink}
            onChange={handleChange}
          />
        </label>

        <label>
          Company Intro
          <textarea
            name="companyIntro"
            rows="5"
            value={formData.companyIntro}
            onChange={handleChange}
          />
        </label>

        <div className="admin-grid">
          <label>
            Primary Color
            <input
              type="color"
              name="theme.primaryColor"
              value={formData.theme.primaryColor}
              onChange={handleChange}
            />
          </label>

          <label>
            Secondary Color
            <input
              type="color"
              name="theme.secondaryColor"
              value={formData.theme.secondaryColor}
              onChange={handleChange}
            />
          </label>

          <label>
            Accent Color
            <input
              type="color"
              name="theme.accentColor"
              value={formData.theme.accentColor}
              onChange={handleChange}
            />
          </label>

          <label>
            Text Color
            <input
              type="color"
              name="theme.textColor"
              value={formData.theme.textColor}
              onChange={handleChange}
            />
          </label>

          <label>
            Background Color
            <input
              type="color"
              name="theme.backgroundColor"
              value={formData.theme.backgroundColor}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Save Homepage</button>
        <p>{status}</p>
      </form>
    </div>
  );
}