import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    primaryColor: { type: String, default: "#0f172a" },
    secondaryColor: { type: String, default: "#1e293b" },
    accentColor: { type: String, default: "#d4af37" },
    textColor: { type: String, default: "#ffffff" },
    backgroundColor: { type: String, default: "#020617" }
  },
  { _id: false }
);

const featuredGemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
  },
  { _id: true }
);

const galleryPreviewSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }
  },
  { _id: true }
);

const homepageSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Discover the Beauty of Natural Gems"
    },
    heroSubtitle: {
      type: String,
      default: "Authentic • Elegant • Certified"
    },
    heroButtonText: {
      type: String,
      default: "Explore Collection"
    },
    heroButtonLink: {
      type: String,
      default: "/gem-collection"
    },
    heroImages: {
      type: [String],
      default: []
    },
    theme: {
      type: themeSchema,
      default: () => ({})
    },
    featuredGems: {
      type: [featuredGemSchema],
      default: [
        {
          name: "Blue Sapphire",
          description: "Premium natural blue sapphire with rich brilliance.",
          image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Ruby",
          description: "Deep red ruby gemstone with timeless elegance.",
          image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba8?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Emerald",
          description: "Vivid green emerald known for luxury and rarity.",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    galleryPreview: {
      type: [galleryPreviewSchema],
      default: [
        {
          image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?auto=format&fit=crop&w=800&q=80"
        },
        {
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
        },
        {
          image: "https://images.unsplash.com/photo-1617038260897-41a1f14a0f59?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    companyIntro: {
      type: String,
      default:
        "Nulan Gems is committed to offering authentic, certified, and elegant gemstones with trusted quality and a premium customer experience."
    }
  },
  { timestamps: true }
);

const Homepage = mongoose.model("Homepage", homepageSchema);

export default Homepage;
