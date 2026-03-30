import Homepage from "../models/Homepage.js";

export const getHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    res.status(200).json(homepage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch homepage data",
      error: error.message
    });
  }
};

export const updateHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create(req.body);
    } else {
      Object.assign(homepage, req.body);
      await homepage.save();
    }

    res.status(200).json({
      message: "Homepage updated successfully",
      data: homepage
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update homepage data",
      error: error.message
    });
  }
};