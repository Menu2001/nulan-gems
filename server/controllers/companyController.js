import Company from "../models/Company.js";

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
      company.logo = `/uploads/${req.file.filename}`;
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