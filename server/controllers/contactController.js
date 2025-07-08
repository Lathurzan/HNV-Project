const Message = require('../models/contactModel');

// @desc    Submit new message
exports.submitMessage = async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log('Contact form submission:', req.body);
    const { fullName, name, email, subject, message } = req.body;
    const contactName = fullName || name; // Accept either fullName or name

    if (!contactName || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = new Message({ fullName: contactName, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error('Contact form save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// @desc    Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

// @desc    Get message count
exports.getMessageCount = async (req, res) => {
  try {
    const count = await Message.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message count' });
  }
};

// @desc    Get unread message count
exports.getUnreadMessageCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({ read: false });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unread message count' });
  }
};

// @desc    Mark a message as read
exports.markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Message.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message marked as read', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
};
