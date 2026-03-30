import Showroom from "../models/Showroom.js";

export const getShowrooms = async (req, res) => {
  try {
    const data = await Showroom.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createShowroom = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const newItem = await Showroom.create({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteShowroom = async (req, res) => {
  try {
    await Showroom.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};