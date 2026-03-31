import Showroom from "../models/Showroom.js";

export const getShowrooms = async (req, res) => {
  try {
    const showrooms = await Showroom.find().sort({ createdAt: -1 });
    res.status(200).json(showrooms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch showrooms",
      error: error.message,
    });
  }
};

export const getShowroomById = async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.id);

    if (!showroom) {
      return res.status(404).json({
        message: "Showroom not found",
      });
    }

    res.status(200).json(showroom);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch showroom",
      error: error.message,
    });
  }
};

export const createShowroom = async (req, res) => {
  try {
    const { name, address, phone, description } = req.body;

    if (!name || !address || !phone || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const newShowroom = await Showroom.create({
      name,
      address,
      phone,
      description,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Showroom created successfully",
      data: newShowroom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create showroom",
      error: error.message,
    });
  }
};

export const updateShowroom = async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.id);

    if (!showroom) {
      return res.status(404).json({
        message: "Showroom not found",
      });
    }

    const { name, address, phone, description } = req.body;

    showroom.name = name ?? showroom.name;
    showroom.address = address ?? showroom.address;
    showroom.phone = phone ?? showroom.phone;
    showroom.description = description ?? showroom.description;

    if (req.file) {
      showroom.image = `/uploads/${req.file.filename}`;
    }

    const updatedShowroom = await showroom.save();

    res.status(200).json({
      message: "Showroom updated successfully",
      data: updatedShowroom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update showroom",
      error: error.message,
    });
  }
};

export const deleteShowroom = async (req, res) => {
  try {
    const deletedShowroom = await Showroom.findByIdAndDelete(req.params.id);

    if (!deletedShowroom) {
      return res.status(404).json({
        message: "Showroom not found",
      });
    }

    res.status(200).json({
      message: "Showroom deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete showroom",
      error: error.message,
    });
  }
};