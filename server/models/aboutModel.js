const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const aboutSchema = new mongoose.Schema(
  {
    mission: { type: String, required: true },
    story: { type: String, required: true },
    features: [featureSchema],
  },
  { collection: "aboutPage" } // 👈 force the collection name
);

module.exports = mongoose.model("About", aboutSchema);
