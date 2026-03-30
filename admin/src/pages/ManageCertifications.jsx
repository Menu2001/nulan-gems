import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/certifications";
const SERVER_URL = "http://localhost:5000";

const initialForm = {
  title: "",
  issuer: "",
  description: "",
  issuedDate: "",
  image: null,
};

export default function ManageCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const fetchCertifications = async () => {
    try {
      const response = await axios.get(API_URL);
      setCertifications(response.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
      setStatus("Failed to load certifications.");
    }
  };

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("");
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving certification...");

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("issuer", formData.issuer);
      payload.append("description", formData.description);
      payload.append("issuedDate", formData.issuedDate);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Certification added successfully.");
      resetForm();
      fetchCertifications();
    } catch (error) {
      console.error("Failed to save certification:", error);
      setStatus(
        error.response?.data?.message || "Failed to save certification."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certification?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatus("Certification deleted successfully.");
      fetchCertifications();
    } catch (error) {
      console.error("Failed to delete certification:", error);
      setStatus("Failed to delete certification.");
    }
  };

  return (
    <div>
      <h1>Manage Certifications</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Certification Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter certification title"
            required
          />
        </label>

        <label>
          Issuer / Lab Name
          <input
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="Enter issuer or lab name"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter certification description"
            required
          />
        </label>

        <label>
          Issued Date
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Image
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        {preview && (
          <div className="admin-preview-box">
            <p>Image Preview</p>
            <img src={preview} alt="Preview" className="admin-preview-image" />
          </div>
        )}

        <button type="submit">Add Certification</button>
        <p>{status}</p>
      </form>

      <div style={{ marginTop: "32px" }}>
        <h2>Certification List</h2>

        <div className="cert-admin-grid">
          {certifications.map((item) => (
            <div className="cert-admin-card" key={item._id}>
              <img src={getImageUrl(item.image)} alt={item.title} />
              <div className="cert-admin-card__body">
                <h3>{item.title}</h3>
                <p>
                  <strong>Issuer:</strong> {item.issuer}
                </p>
                <p>
                  <strong>Issued Date:</strong> {item.issuedDate}
                </p>
                <p>{item.description}</p>

                <div className="cert-admin-card__actions">
                  <button
                    className="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {certifications.length === 0 && <p>No certifications found.</p>}
        </div>
      </div>
    </div>
  );
}