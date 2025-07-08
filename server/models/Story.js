// models/Story.js

const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  story: {
    type: String,
    required: true,
  },
  yearOfEstablishment: {
    type: String,
    default: "", // Optional field
  },
});

module.exports = mongoose.model("Story", storySchema);
