import Certification from "../models/Certification.js";

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch certifications",
      error: error.message,
    });
  }
};

export const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch certification",
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

    const newCertification = await Certification.create({
      title,
      issuer,
      description,
      issuedDate,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Certification created successfully",
      data: newCertification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create certification",
      error: error.message,
    });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    const { title, issuer, description, issuedDate } = req.body;

    certification.title = title ?? certification.title;
    certification.issuer = issuer ?? certification.issuer;
    certification.description = description ?? certification.description;
    certification.issuedDate = issuedDate ?? certification.issuedDate;

    if (req.file) {
      certification.image = `/uploads/${req.file.filename}`;
    }

    const updatedCertification = await certification.save();

    res.status(200).json({
      message: "Certification updated successfully",
      data: updatedCertification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update certification",
      error: error.message,
    });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);

    if (!deletedCertification) {
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