import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/showrooms";
const SERVER_URL = "http://localhost:5000";

const initialForm = {
  name: "",
  address: "",
  phone: "",
  description: "",
  image: null,
};

export default function ManageShowrooms() {
  const [showrooms, setShowrooms] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const fetchShowrooms = async () => {
    try {
      const response = await axios.get(API_URL);
      setShowrooms(response.data);
    } catch (error) {
      console.error("Failed to fetch showrooms:", error);
      setStatus("Failed to load showrooms.");
    }
  };

  useEffect(() => {
    fetchShowrooms();
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
    setStatus("Saving showroom...");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("address", formData.address);
      payload.append("phone", formData.phone);
      payload.append("description", formData.description);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Showroom added successfully.");
      resetForm();
      fetchShowrooms();
    } catch (error) {
      console.error("Failed to save showroom:", error);
      setStatus(error.response?.data?.message || "Failed to save showroom.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this showroom?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatus("Showroom deleted successfully.");
      fetchShowrooms();
    } catch (error) {
      console.error("Failed to delete showroom:", error);
      setStatus("Failed to delete showroom.");
    }
  };

  return (
    <div>
      <h1>Manage Show Rooms</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Showroom Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter showroom name"
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter showroom address"
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter contact number"
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
            placeholder="Enter showroom description"
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

        <button type="submit">Add Show Room</button>
        <p>{status}</p>
      </form>

      <div style={{ marginTop: "32px" }}>
        <h2>Show Room List</h2>

        <div className="showroom-admin-grid">
          {showrooms.map((item) => (
            <div className="showroom-admin-card" key={item._id}>
              <img src={getImageUrl(item.image)} alt={item.name} />
              <div className="showroom-admin-card__body">
                <h3>{item.name}</h3>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Phone:</strong> {item.phone}</p>
                <p>{item.description}</p>

                <div className="showroom-admin-card__actions">
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

          {showrooms.length === 0 && <p>No show rooms found.</p>}
        </div>
      </div>
    </div>
  );
}