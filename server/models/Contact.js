import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    mapLink: { type: String, default: "" },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;