const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: String,
    image: {
      type: String,
      default: '',
      validate: {
        validator: function (v) {
          // Allow empty string or valid URL
          return v === '' || /^https?:\/\//.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`,
      }
      // REMOVE the get function, as it interferes with saving
    },
    rating: { type: Number, default: 5 },
    quote: { type: String, required: true },
    hidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "testimonial", // ✅ explicitly set
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
