const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  toggleVisibility,
  getTestimonialCount,
  getRecentTestimonials,
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.delete("/:id", deleteTestimonial);
router.get('/count', getTestimonialCount);
router.patch("/toggle/:id", toggleVisibility);
router.get("/recent", getRecentTestimonials);

module.exports = router;
