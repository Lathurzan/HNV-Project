// controllers/storyController.js

const Story = require("../models/Story");

// @desc   Get current HNV story
// @route  GET /api/story
// @access Public or Admin-only (add auth if needed)
exports.getStory = async (req, res) => {
  try {
    const story = await Story.findOne();
    res.status(200).json(story || { story: "" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching story", error });
  }
};

// @desc   Create or update HNV story
// @route  POST /api/story
// @access Admin
exports.saveOrUpdateStory = async (req, res) => {
  try {
    const { story, yearOfEstablishment } = req.body;

    if (!story) {
      return res.status(400).json({ message: "Story content is required" });
    }

    let existingStory = await Story.findOne();

    if (existingStory) {
      existingStory.story = story;
      if (yearOfEstablishment) existingStory.yearOfEstablishment = yearOfEstablishment;
      await existingStory.save();
    } else {
      await Story.create({ story, yearOfEstablishment });
    }

    res.status(200).json({ message: "Story saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving story", error });
  }
};
