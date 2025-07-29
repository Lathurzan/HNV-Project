require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const serviceRoutes = require('./routes/serviceRoutes');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global error handler for 413 Payload Too Large
app.use((err, req, res, next) => {
  if (err.status === 413) {
    return res.status(413).json({
      message: 'You uploaded a large file. Please reduce the image size and try again.'
    });
  }
  next(err);
});

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/sectors', require('./routes/sectorRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/story", require("./routes/story"));
app.use('/api/messages', require('./routes/contactRoutes'));


const Testimonial = require("./models/testimonialModel");

app.get("/debug/all-testimonials", async (req, res) => {
  const data = await Testimonial.find();
  console.log("📦 Testimonials in DB:", data);
  res.json(data);
});

// Connect to MongoDB using Mongoose before starting the server
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lathulathurzan:QTBxgGTyLd09yJ7@hnv.bgpji1c.mongodb.net/?retryWrites=true&w=majority&appName=HNV';
mongoose.connect(MONGO_URI, { dbName: 'HNV' })
  .then(() => {
    console.log('Mongoose connected to DB:', mongoose.connection.name);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
    process.exit(1);
  });
