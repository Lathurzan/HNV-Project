const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getMessages,
  deleteMessage,
  getUnreadMessageCount,
  markMessageAsRead,
} = require('../controllers/contactController');

// POST - Submit message
router.post('/', submitMessage);

// GET - Get all messages
router.get('/', getMessages);

// GET - Get unread message count
router.get('/unread-count', getUnreadMessageCount);

// PATCH - Mark message as read
router.patch('/:id/read', markMessageAsRead);

// DELETE - Delete message by ID
router.delete('/:id', deleteMessage);

module.exports = router;
