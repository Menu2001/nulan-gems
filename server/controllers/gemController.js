import Gem from "../models/Gem.js";
import { deleteImageByPublicId, uploadImageBuffer } from "../utils/cloudinary.js";

export const getAllGems = async (req, res) => {
  try {
    const gems = await Gem.find().sort({ createdAt: -1 });
    res.status(200).json(gems);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gems",
      error: error.message,
    });
  }
};

export const getGemById = async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    res.status(200).json(gem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gem",
      error: error.message,
    });
  }
};

export const createGem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: "Name, description, price and category are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const uploadedImage = await uploadImageBuffer(req.file, "nulan-gems/gems");

    const newGem = await Gem.create({
      name,
      description,
      image: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      price: Number(price),
      category,
    });

    res.status(201).json({
      message: "Gem created successfully",
      data: newGem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create gem",
      error: error.message,
    });
  }
};

export const updateGem = async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id);

    if (!gem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    const { name, description, price, category } = req.body;

    gem.name = name ?? gem.name;
    gem.description = description ?? gem.description;
    gem.price = price !== undefined ? Number(price) : gem.price;
    gem.category = category ?? gem.category;

    if (req.file) {
      await deleteImageByPublicId(gem.imagePublicId);
      const uploadedImage = await uploadImageBuffer(req.file, "nulan-gems/gems");
      gem.image = uploadedImage.secure_url;
      gem.imagePublicId = uploadedImage.public_id;
    }

    const updatedGem = await gem.save();

    res.status(200).json({
      message: "Gem updated successfully",
      data: updatedGem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update gem",
      error: error.message,
    });
  }
};

export const deleteGem = async (req, res) => {
  try {
    const deletedGem = await Gem.findByIdAndDelete(req.params.id);

    if (!deletedGem) {
      return res.status(404).json({ message: "Gem not found" });
    }

    await deleteImageByPublicId(deletedGem.imagePublicId);

    res.status(200).json({
      message: "Gem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete gem",
      error: error.message,
    });
  }
};
