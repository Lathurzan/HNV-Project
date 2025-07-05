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
      return res.status(400).json({ 
        message: 'Required fields are missing', 
        fields: { siteName, siteTagline, email, phone, address },
        error: true
      });
    }

    // Validate each social media URL strictly (must be a valid https URL and exactly the correct domain)
    const validateSocialUrl = (url, domain) => {
      if (!url) return true; // allow empty
      try {
        const parsed = new URL(url);
        return (
          parsed.protocol === 'https:' &&
          (parsed.hostname === domain || parsed.hostname === `www.${domain}`)
        );
      } catch {
        return false;
      }
    };

    if (!validateSocialUrl(facebookUrl, 'facebook.com')) {
      return res.status(400).json({ 
        message: 'Facebook URL must be a valid https://facebook.com link', 
        value: facebookUrl,
        error: true
      });
    }
    if (!validateSocialUrl(instagramUrl, 'instagram.com')) {
      return res.status(400).json({ 
        message: 'Instagram URL must be a valid https://instagram.com link', 
        value: instagramUrl,
        error: true
      });
    }
    if (!validateSocialUrl(twitterUrl, 'twitter.com')) {
      return res.status(400).json({ 
        message: 'Twitter URL must be a valid https://twitter.com link', 
        value: twitterUrl,
        error: true
      });
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

    res.status(200).json({ message: 'Settings saved successfully', error: false });
  } catch (err) {
    console.error('Save settings error:', err);
    res.status(500).json({ message: 'Unable to save settings', error: true, details: err.message });
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
    res.status(500).json({ message: 'Unable to fetch settings', error: true, details: err.message });
  }
};

module.exports = {
  saveSettings,
  getSettings,
};
