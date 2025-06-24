const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = connectDB();
  return dbPromise;
}

const getSectors = async (req, res) => {
  try {
    const db = await getDB();
    const sectors = await db.collection('sectors').find().toArray();
    res.json(sectors);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addSector = async (req, res) => {
  try {
    const { title, desc, img } = req.body;
    if (!title || !desc || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await getDB();
    const result = await db.collection('sectors').insertOne({ title, desc, img });

    res.status(201).json({ message: 'Sector added', id: result.insertedId });
  } catch (err) {
    console.error('Add error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, img } = req.body;

    const db = await getDB();
    const result = await db.collection('sectors').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, desc, img } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Sector updated' });
    } else {
      res.status(404).json({ message: 'Sector not found or unchanged' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;

    const db = await getDB();
    const result = await db.collection('sectors').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Sector deleted' });
    } else {
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSectors,
  addSector,
  updateSector,
  deleteSector
};
