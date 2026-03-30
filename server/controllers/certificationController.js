import Certification from "../models/Certification.js";

export const getCertifications = async (req, res) => {
  try {
    const data = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch certifications",
      error: error.message,
    });
  }
};

export const createCertification = async (req, res) => {
  try {
    const { title, issuer, description, issuedDate } = req.body;

    if (!title || !issuer || !description || !issuedDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const newItem = await Certification.create({
      title,
      issuer,
      description,
      issuedDate,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Certification created successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create certification",
      error: error.message,
    });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const deletedItem = await Certification.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    res.status(200).json({
      message: "Certification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete certification",
      error: error.message,
    });
  }
};