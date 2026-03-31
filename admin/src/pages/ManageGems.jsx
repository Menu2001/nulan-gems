import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const API_URL = "http://localhost:5000/api/gems";
const SERVER_URL = "http://localhost:5000";

const initialForm = {
  name: "",
  description: "",
  image: null,
  price: "",
  category: "",
};

export default function ManageGems() {
  const [gems, setGems] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const fetchGems = async () => {
    try {
      const response = await axios.get(API_URL);
      setGems(response.data);
    } catch (error) {
      console.error("Failed to fetch gems:", error);
      setStatus("Failed to load gems.");
    }
  };

  useEffect(() => {
    fetchGems();
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
    setEditingId(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStatus("Gem updated successfully.");
      } else {
        if (!formData.image) {
          setStatus("Please select an image.");
          return;
        }

        await axios.post(API_URL, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setStatus("Gem added successfully.");
      }

      resetForm();
      fetchGems();
    } catch (error) {
      console.error("Failed to save gem:", error);
      setStatus(error.response?.data?.message || "Failed to save gem.");
    }
  };

  const handleEdit = (gem) => {
    setEditingId(gem._id);
    setFormData({
      name: gem.name,
      description: gem.description,
      image: null,
      price: gem.price,
      category: gem.category,
    });
    setPreview(getImageUrl(gem.image));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this gem?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatus("Gem deleted successfully.");
      fetchGems();
    } catch (error) {
      console.error("Failed to delete gem:", error);
      setStatus("Failed to delete gem.");
    }
  };

  return (
    <div>
      <h1>Manage Gems</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Gem Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            {...(!editingId ? { required: true } : {})}
          />
        </label>

        {preview && (
          <div style={{ marginBottom: "18px" }}>
            <p style={{ marginBottom: "8px", fontWeight: 600 }}>Image Preview</p>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "240px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>
        )}

        <label>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button type="submit">{editingId ? "Update Gem" : "Add Gem"}</button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#64748b",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <p>{status}</p>
      </form>

      <div style={{ marginTop: "32px" }}>
        <h2>Gem List</h2>

        <div className="gem-admin-grid">
          {gems.map((gem) => (
            <div className="gem-admin-card" key={gem._id}>
              <img src={getImageUrl(gem.image)} alt={gem.name} />
              <div className="gem-admin-card__body">
                <h3>{gem.name}</h3>
                <p>{gem.description}</p>
                <p>
                  <strong>Category:</strong> {gem.category}
                </p>
                <p>
                  <strong>Price:</strong> ${gem.price}
                </p>

                <div className="gem-admin-card__actions">
                  <button onClick={() => handleEdit(gem)}>Edit</button>
                  <button
                    onClick={() => handleDelete(gem._id)}
                    className="danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {gems.length === 0 && <p>No gems found.</p>}
        </div>
      </div>
    </div>
  );
}