const mongoose = require('mongoose');

const connectMongoose = async () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/HNV';
    await mongoose.connect(uri);
    console.log('Mongoose connected');
  }
};

module.exports = connectMongoose;
