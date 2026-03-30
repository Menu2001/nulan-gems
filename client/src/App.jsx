import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import GemCollection from "./pages/GemCollection";
import GemDetails from "./pages/GemDetails";
import ShowRooms from "./pages/ShowRooms";
import Gallery from "./pages/Gallery";
import Certifications from "./pages/Certifications";
import OurCompany from "./pages/OurCompany";
import ManageContact from "./pages/ContactUs";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gem-collection" element={<GemCollection />} />
        <Route path="/gem/:id" element={<GemDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/show-rooms" element={<ShowRooms />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/our-company" element={<OurCompany />} />
        <Route path="/placeholder" element={<PlaceholderPage />} />   
        <Route path="/contact-us" element={<ManageContact />} />
      </Routes>
    </>
  );
}