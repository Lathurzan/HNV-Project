const { connectDB } = require('../config/db');

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

    const db = await getDB();
    const collection = db.collection('aboutPage');

    // Upsert (update if exists, otherwise insert)
    const result = await collection.updateOne(
      { _id: "about-content" }, // static ID for single-page data
      { $set: { mission, story, features } },
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
    const db = await getDB();
    const content = await db.collection('aboutPage').findOne({ _id: "about-content" });

    if (!content) {
      return res.status(404).json({ message: "No about page data found" });
    }

    res.json(content);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveAboutPage, getAboutPage };
