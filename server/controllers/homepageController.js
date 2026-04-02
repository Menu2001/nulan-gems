import Homepage from "../models/homepage.js";
import Gem from "../models/Gem.js";
import Showroom from "../models/Showroom.js";

export const getHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    const latestGemsForHero = await Gem.find({ image: { $exists: true, $ne: "" } })
      .sort({ createdAt: -1 })
      .limit(4);

    const randomFeaturedGems = await Gem.aggregate([
      { $match: { image: { $exists: true, $ne: "" } } },
      { $sample: { size: 3 } },
    ]);

    const gemGalleryItems = await Gem.aggregate([
      { $match: { image: { $exists: true, $ne: "" } } },
      {
        $project: {
          _id: 1,
          image: 1,
          name: 1,
          type: { $literal: "gem" },
        },
      },
    ]);

    const showroomGalleryItems = await Showroom.aggregate([
      { $match: { image: { $exists: true, $ne: "" } } },
      {
        $project: {
          _id: 1,
          image: 1,
          name: 1,
          type: { $literal: "showroom" },
        },
      },
    ]);

    const combinedGalleryItems = [...gemGalleryItems, ...showroomGalleryItems];

    const shuffledGalleryItems = combinedGalleryItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const dynamicHeroImages = latestGemsForHero
      .map((gem) => gem.image)
      .filter(Boolean);

    const responseData = {
      ...homepage.toObject(),
      heroImages:
        dynamicHeroImages.length > 0
          ? dynamicHeroImages
          : homepage.heroImages || [],
      featuredGems:
        randomFeaturedGems.length > 0
          ? randomFeaturedGems
          : homepage.featuredGems || [],
      galleryPreview:
        shuffledGalleryItems.length > 0
          ? shuffledGalleryItems
          : homepage.galleryPreview || [],
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch homepage data",
      error: error.message,
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
      data: homepage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update homepage data",
      error: error.message,
    });
  }
};
