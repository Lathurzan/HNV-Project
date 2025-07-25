const { connectDB } = require('../config/db');
const About = require("../models/aboutModel");

let dbPromise = null;
function getDB() {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  return dbPromise;
}

// Save or update About Page
const saveAboutPage = async (req, res) => {
  try {
    const { mission, story, features } = req.body;

    if (!mission || !story || !Array.isArray(features)) {
      return res.status(400).json({ message: "Invalid about page data" });
    }

    // Limit features to first 4 items only
    const trimmedFeatures = features.slice(0, 4);

    const db = await getDB();
    const collection = db.collection('aboutPage');

    // Upsert (update if exists, otherwise insert)
    const result = await collection.updateOne(
      { _id: "about-content" }, // static ID for single-page data
      { $set: { mission, story, features: trimmedFeatures } },
      { upsert: true }
    );

    res.status(200).json({ message: "About page saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get About Page content
const getAboutPage = async (req, res) => {
  try {
    const about = await About.findOne({});
    if (!about) {
      return res.status(404).json({ message: "No about page data found" });
    }
    res.json(about);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveAboutPage, getAboutPage };
