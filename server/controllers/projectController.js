const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

let dbPromise;
function getDB() {
  if (!dbPromise) dbPromise = connectDB();
  return dbPromise;
}

const getProjects = async (req, res) => {
  try {
    const db = await getDB();
    const projects = await db.collection('projects').find().toArray();
    res.json(projects);
  } catch (err) {
    console.error('Get Projects Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addProject = async (req, res) => {
  try {
    const { title, category, image } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await getDB();
    const result = await db.collection('projects').insertOne({ title, category, image });

    res.status(201).json({ message: 'Project added', projectId: result.insertedId });
  } catch (err) {
    console.error('Add Project Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image } = req.body;

    const db = await getDB();
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, category, image } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Project updated' });
    } else {
      res.status(404).json({ message: 'Project not found or unchanged' });
    }
  } catch (err) {
    console.error('Update Project Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const db = await getDB();
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    console.error('Delete Project Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject
};
