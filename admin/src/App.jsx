import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomepageManager from "./pages/HomepageManager";
import ManageGems from "./pages/ManageGems";
import ManageShowrooms from "./pages/ManageShowrooms";

function Layout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Nulan Gems Admin</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/homepage">Homepage Manager</Link>
          <Link to="/gems">Manage Gems</Link>
          <Link to="/showrooms">Manage Show Rooms</Link>
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
      </Routes>
    </Layout>
  );
}