const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  toggleVisibility,
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.delete("/:id", deleteTestimonial);
router.patch("/toggle/:id", toggleVisibility);

module.exports = router;
