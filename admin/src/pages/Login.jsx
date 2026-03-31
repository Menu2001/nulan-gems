import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Signing in...");

    try {
      const response = await axios.post(API_URL, formData);

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUser", JSON.stringify(response.data.admin));

      setStatus("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      setStatus(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Sign in to access the Nulan Gems administration panel.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Login"}
          </button>

          {status && <p className="login-status">{status}</p>}
        </form>
      </div>
    </main>
  );
}