import Company from "../models/Company.js";
import { deleteImageByPublicId, uploadImageBuffer } from "../utils/cloudinary.js";

export const getCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (!company) {
      company = await Company.create({});
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company data",
      error: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (!company) {
      company = await Company.create({});
    }

    const { companyName, aboutText, vision, mission } = req.body;

    company.companyName = companyName ?? company.companyName;
    company.aboutText = aboutText ?? company.aboutText;
    company.vision = vision ?? company.vision;
    company.mission = mission ?? company.mission;

    if (req.file) {
      await deleteImageByPublicId(company.logoPublicId);
      const uploadedImage = await uploadImageBuffer(req.file, "nulan-gems/company");
      company.logo = uploadedImage.secure_url;
      company.logoPublicId = uploadedImage.public_id;
    }

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update company data",
      error: error.message,
    });
  }
};
