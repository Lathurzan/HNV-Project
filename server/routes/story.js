// routes/story.js

const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

// GET the current story
router.get("/", storyController.getStory);

// POST or UPDATE the story
router.post("/", storyController.saveOrUpdateStory);

module.exports = router;