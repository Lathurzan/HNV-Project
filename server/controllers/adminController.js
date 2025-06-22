const { client, connectDB } = require('../config/db');

let dbPromise = null;
function getDB() {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  return dbPromise;
}

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    const admin = await adminCollection.findOne({ username, password });

    if (admin) {
      return res.status(200).json({ message: 'Login successful', auth: true });
    } else {
      return res.status(401).json({ message: 'Invalid username or password', auth: false });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    // Check if username already exists
    const existingUser = await adminCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Insert new admin user document
    const result = await adminCollection.insertOne({ username, password });

    if (result.insertedId) {
      return res.status(201).json({ message: 'Admin registered successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to register admin' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const changeAdminPassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await getDB();
    const adminCollection = db.collection('adminUser');

    // 1. Check if admin with username and oldPassword exists
    const admin = await adminCollection.findOne({ username, password: oldPassword });

    if (!admin) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // 2. Update password
    const result = await adminCollection.updateOne(
      { username },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to update password' });
    }
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  adminLogin,
  adminRegister,
  changeAdminPassword
};