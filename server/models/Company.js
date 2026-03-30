import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "Nulan Gems",
      trim: true,
    },
    aboutText: {
      type: String,
      default: "Nulan Gems is dedicated to offering authentic, elegant, and professionally presented gemstones with trust and quality.",
      trim: true,
    },
    vision: {
      type: String,
      default: "To become a trusted and respected name in the gemstone industry through quality, authenticity, and excellence.",
      trim: true,
    },
    mission: {
      type: String,
      default: "To provide premium gemstones and a reliable customer experience backed by professionalism and integrity.",
      trim: true,
    },
    logo: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;