import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { buildApiUrl } from "../config";

const API_URL = buildApiUrl("/api/contact-messages");

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setStatus("Failed to load messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatus("Message deleted successfully.");
      fetchMessages();
    } catch (error) {
      console.error("Failed to delete message:", error);
      setStatus("Failed to delete message.");
    }
  };

  return (
    <div>
      <h1>Manage Messages</h1>
      <p>{status}</p>

      <div className="messages-grid">
        {messages.map((item) => (
          <div className="message-card" key={item._id}>
            <div className="message-card__body">
              <h3>{item.name}</h3>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Message:</strong></p>
              <p>{item.message}</p>
              <p><strong>Sent:</strong> {new Date(item.createdAt).toLocaleString()}</p>

              <div className="message-card__actions">
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

        {messages.length === 0 && <p>No messages found.</p>}
      </div>
    </div>
  );
}
