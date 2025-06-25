const express = require("express");
const router = express.Router();
const { getAboutPage, saveAboutPage } = require("../controllers/aboutController");

router.get("/", getAboutPage);
router.post("/", saveAboutPage);

module.exports = router;
