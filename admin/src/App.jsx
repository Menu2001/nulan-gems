import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import HomepageManager from "./pages/HomepageManager";
import ManageGems from "./pages/ManageGems";
import ManageShowrooms from "./pages/ManageShowrooms";
import ManageCertifications from "./pages/ManageCertifications";
import ManageCompany from "./pages/ManageCompany";
import ManageContact from "./pages/ManageContact";
import ManageMessages from "./pages/ManageMessages";

const API_URL = "http://localhost:5000/api/company";
const SERVER_URL = "http://localhost:5000";

function Layout({ children }) {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(API_URL);
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to load company brand:", error);
      }
    };

    fetchCompany();
  }, []);

  const logoUrl = company?.logo ? `${SERVER_URL}${company.logo}` : "";

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          {logoUrl ? (
            <img src={logoUrl} alt="Company Logo" className="admin-brand__logo" />
          ) : (
            <div className="admin-brand__placeholder">NG</div>
          )}

          <div className="admin-brand__text">
            <h2>{company?.companyName || "Nulan Gems"}</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/homepage">Homepage Manager</Link>
          <Link to="/gems">Manage Gems</Link>
          <Link to="/showrooms">Manage Show Rooms</Link>
          <Link to="/certifications">Manage Certifications</Link>
          <Link to="/company">Manage Company</Link>
          <Link to="/contact">Manage Contact</Link>
          <Link to="/messages">Manage Messages</Link>
        </nav>
      </aside>

      <section className="admin-content">{children}</section>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/homepage" element={<HomepageManager />} />
        <Route path="/gems" element={<ManageGems />} />
        <Route path="/showrooms" element={<ManageShowrooms />} />
        <Route path="/certifications" element={<ManageCertifications />} />
        <Route path="/company" element={<ManageCompany />} />
        <Route path="/contact" element={<ManageContact />} />
        <Route path="/messages" element={<ManageMessages />} />
      </Routes>
    </Layout>
  );
}