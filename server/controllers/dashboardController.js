import Gem from "../models/Gem.js";
import Showroom from "../models/Showroom.js";
import Certification from "../models/Certification.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalGems = await Gem.countDocuments();
    const totalShowrooms = await Showroom.countDocuments();
    const totalCertifications = await Certification.countDocuments();

    const recentGems = await Gem.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category price");

    const recentShowrooms = await Showroom.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name address phone");

    const recentCertifications = await Certification.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title issuer issuedDate");

    res.status(200).json({
      totalGems,
      totalShowrooms,
      totalCertifications,
      recentGems,
      recentShowrooms,
      recentCertifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
};