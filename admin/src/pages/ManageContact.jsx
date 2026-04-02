import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { buildApiUrl } from "../config";

const API_URL = buildApiUrl("/api/contact");

export default function ManageContact() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    mapLink: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(API_URL, form);
    setStatus("Updated successfully ✔️");
  };

  return (
    <div>
      <h1>Manage Contact</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp Link" />
        <input name="mapLink" value={form.mapLink} onChange={handleChange} placeholder="Google Map Embed Link" />

        <button type="submit">Save</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
