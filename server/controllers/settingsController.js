const { connectDB } = require('../config/db');

// Save or update settings
const saveSettings = async (req, res) => {
  try {
    const {
      siteName,
      siteTagline,
      email,
      phone,
      address,
      facebookUrl,
      instagramUrl,
      twitterUrl
    } = req.body;

    if (!siteName || !siteTagline || !email || !phone || !address) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const db = await connectDB();
    const settingsCollection = db.collection('settings');

    // Always update a single document (singleton config)
    const result = await settingsCollection.updateOne(
      { _id: 'global' },
      {
        $set: {
          siteName,
          siteTagline,
          email,
          phone,
          address,
          facebookUrl,
          instagramUrl,
          twitterUrl,
        },
      },
      { upsert: true }
    );

    res.status(200).json({ message: 'Settings saved successfully' });
  } catch (err) {
    console.error('Save settings error:', err);
    res.status(500).json({ message: 'Unable to save settings' });
  }
};

// Get current settings
const getSettings = async (req, res) => {
  try {
    const db = await connectDB(); // Use connectDB, not getDB
    const settingsCollection = db.collection('settings');

    const settings = await settingsCollection.findOne({ _id: 'global' });

    if (!settings) {
      // Return empty settings object instead of 404 to avoid frontend 500 error
      return res.status(200).json({});
    }

    res.status(200).json(settings);
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ message: 'Unable to fetch settings' });
  }
};

module.exports = {
  saveSettings,
  getSettings,
};
