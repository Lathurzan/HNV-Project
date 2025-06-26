const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = connectDB();
  return dbPromise;
}

// ✅ GET all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const db = await getDB();
    const testimonials = await db.collection('testimonial').find().toArray();
    res.status(200).json(testimonials);
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch testimonials' });
  }
};

// ✅ POST a new testimonial
exports.createTestimonial = async (req, res) => {
  const { name, position, image, rating, quote } = req.body;

  if (!name || !quote) {
    return res.status(400).json({ message: 'Name and quote are required' });
  }

  // Basic image URL validation (allow empty or http/https)
  if (image && image !== '' && !/^https?:\/\//.test(image)) {
    return res.status(400).json({ message: 'Invalid image URL' });
  }

  try {
    const db = await getDB();
    const doc = {
      name,
      position,
      image: image || '',
      rating: rating || 5,
      quote,
      hidden: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('testimonial').insertOne(doc);
    res.status(201).json({ message: 'Testimonial created', testimonial: { ...doc, _id: result.insertedId } });
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ message: 'Failed to create testimonial', error: err.message });
  }
};

// ✅ DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('testimonial').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete testimonial' });
  }
};

// ✅ PATCH toggle visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const db = await getDB();
    const testimonial = await db.collection('testimonial').findOne({ _id: new ObjectId(req.params.id) });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    const updated = await db.collection('testimonial').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { hidden: !testimonial.hidden, updatedAt: new Date() } }
    );
    res.status(200).json({ message: `Testimonial ${!testimonial.hidden ? 'hidden' : 'unhidden'}` });
  } catch (err) {
    console.error('Visibility Toggle Error:', err);
    res.status(500).json({ message: 'Failed to toggle visibility' });
  }
};
