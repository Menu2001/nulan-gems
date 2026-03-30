import Gem from "../models/Gem.js";
import Showroom from "../models/Showroom.js";

const shuffleArray = (array) => {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
};

export const getGalleryItems = async (req, res) => {
  try {
    const gems = await Gem.find().select("name image category createdAt");
    const showrooms = await Showroom.find().select("name image address createdAt");

    const gemItems = gems.map((item) => ({
      _id: item._id,
      title: item.name,
      image: item.image,
      type: "Gem",
      subtitle: item.category || "Gem Collection",
      createdAt: item.createdAt,
    }));

    const showroomItems = showrooms.map((item) => ({
      _id: item._id,
      title: item.name,
      image: item.image,
      type: "Showroom",
      subtitle: item.address || "Show Room",
      createdAt: item.createdAt,
    }));

    const mergedItems = [...gemItems, ...showroomItems];
    const shuffledItems = shuffleArray(mergedItems);

    res.status(200).json(shuffledItems);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gallery items",
      error: error.message,
    });
  }
};