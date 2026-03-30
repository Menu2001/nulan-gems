import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-card__icon">💎</span>
          <div>
            <h3>Total Gems</h3>
            <p>{data.totalGems}</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <span className="dashboard-stat-card__icon">🏢</span>
          <div>
            <h3>Total Show Rooms</h3>
            <p>{data.totalShowrooms}</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <span className="dashboard-stat-card__icon">📜</span>
          <div>
            <h3>Total Certifications</h3>
            <p>{data.totalCertifications}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-panel">
          <h2>Recent Gems</h2>
          {data.recentGems.length > 0 ? (
            <ul className="dashboard-list">
              {data.recentGems.map((item) => (
                <li key={item._id}>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No gems found.</p>
          )}
        </div>

        <div className="dashboard-panel">
          <h2>Recent Show Rooms</h2>
          {data.recentShowrooms.length > 0 ? (
            <ul className="dashboard-list">
              {data.recentShowrooms.map((item) => (
                <li key={item._id}>
                  <strong>{item.name}</strong>
                  <span>{item.address}</span>
                  <span>{item.phone}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No show rooms found.</p>
          )}
        </div>

        <div className="dashboard-panel">
          <h2>Recent Certifications</h2>
          {data.recentCertifications.length > 0 ? (
            <ul className="dashboard-list">
              {data.recentCertifications.map((item) => (
                <li key={item._id}>
                  <strong>{item.title}</strong>
                  <span>{item.issuer}</span>
                  <span>{item.issuedDate}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No certifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}