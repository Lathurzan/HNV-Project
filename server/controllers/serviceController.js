const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = connectDB();
  return dbPromise;
}

// GET all services
exports.getAllServices = async (req, res) => {
  try {
    const db = await getDB();
    const services = await db.collection('services').find().toArray();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// ADD new service
exports.addService = async (req, res) => {
  try {
    const { title, description, image, active } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const db = await getDB();
    const doc = {
      title,
      description,
      image,
      active: active !== undefined ? active : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('services').insertOne(doc);
    res.status(201).json({ message: 'Service added successfully', service: { ...doc, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add service' });
  }
};

// UPDATE a service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    const update = { ...req.body, updatedAt: new Date() };
    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Service updated successfully' });
    } else {
      res.status(404).json({ message: 'Service not found or unchanged' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// DELETE a service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};

// TOGGLE active status
exports.toggleServiceActive = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    const service = await db.collection('services').findOne({ _id: new ObjectId(id) });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    const updated = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: { active: !service.active, updatedAt: new Date() } }
    );
    res.status(200).json({ message: 'Service status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle status' });
  }
};
