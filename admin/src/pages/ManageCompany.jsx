import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { buildApiUrl, buildAssetUrl } from "../config";

const API_URL = buildApiUrl("/api/company");

const initialForm = {
  companyName: "",
  aboutText: "",
  vision: "",
  mission: "",
  logo: null,
};

export default function ManageCompany() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;

        setFormData({
          companyName: data.companyName || "",
          aboutText: data.aboutText || "",
          vision: data.vision || "",
          mission: data.mission || "",
          logo: null,
        });

        if (data.logo) {
          setPreview(buildAssetUrl(data.logo));
        }
      } catch (error) {
        console.error("Failed to load company data:", error);
        setStatus("Failed to load company data.");
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving company data...");

    try {
      const payload = new FormData();
      payload.append("companyName", formData.companyName);
      payload.append("aboutText", formData.aboutText);
      payload.append("vision", formData.vision);
      payload.append("mission", formData.mission);

      if (formData.logo) {
        payload.append("logo", formData.logo);
      }

      await axios.put(API_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Company updated successfully.");
    } catch (error) {
      console.error("Failed to update company:", error);
      setStatus(error.response?.data?.message || "Failed to update company.");
    }
  };

  return (
    <div>
      <h1>Manage Company</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </label>

        <label>
          About Company
          <textarea
            name="aboutText"
            rows="5"
            value={formData.aboutText}
            onChange={handleChange}
            placeholder="Enter company description"
            required
          />
        </label>

        <label>
          Vision
          <textarea
            name="vision"
            rows="4"
            value={formData.vision}
            onChange={handleChange}
            placeholder="Enter company vision"
            required
          />
        </label>

        <label>
          Mission
          <textarea
            name="mission"
            rows="4"
            value={formData.mission}
            onChange={handleChange}
            placeholder="Enter company mission"
            required
          />
        </label>

        <label>
          Company Logo
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        {preview && (
          <div className="admin-preview-box">
            <p>Logo Preview</p>
            <img src={preview} alt="Logo Preview" className="admin-logo-preview" />
          </div>
        )}

        <button type="submit">Save Company</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
