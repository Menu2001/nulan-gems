import { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";

const CONTACT_API_URL = "http://localhost:5000/api/contact";
const MESSAGE_API_URL = "http://localhost:5000/api/contact-messages";

export default function ContactUs() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(CONTACT_API_URL);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };

    fetchContact();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("Sending message...");

    try {
      await axios.post(MESSAGE_API_URL, form);

      setStatus("Message sent successfully ✔️");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus(
        error.response?.data?.message || "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  if (!data) {
    return <div className="contact-page-loading">Loading contact details...</div>;
  }

  return (
    <main className="contact-page">
      <section className="contact-page__hero">
        <p className="contact-page__eyebrow">Get In Touch</p>
        <h1>Contact Us</h1>
        <p className="contact-page__subtitle">
          Reach out to Nulan Gems for inquiries, showroom visits, gemstone
          information, or professional assistance.
        </p>
      </section>

      <section className="contact-page__content">
        <div className="contact-grid">
          <div className="contact-card contact-card--info">
            <h2>Contact Information</h2>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-item__icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p>{data.phone || "Not available"}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-item__icon">✉️</span>
                <div>
                  <h3>Email</h3>
                  <p>{data.email || "Not available"}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-item__icon">📍</span>
                <div>
                  <h3>Address</h3>
                  <p>{data.address || "Not available"}</p>
                </div>
              </div>
            </div>

            {data.whatsapp && (
              <a
                href={data.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="contact-whatsapp-btn"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>

          <div className="contact-card contact-card--form">
            <h2>Send a Message</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  required
                />
              </label>

              <button type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </button>

              {status && <p className="contact-form__status">{status}</p>}
            </form>
          </div>
        </div>

        {data.mapLink && (
          <div className="contact-map-card">
            <h2>Find Us on the Map</h2>
            <div className="contact-map-wrap">
              <iframe
                src={data.mapLink}
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Nulan Gems Location Map"
              ></iframe>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}