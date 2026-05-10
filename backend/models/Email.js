const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject:    { type: String, required: true },
  body:       { type: String, required: true },
  recipients: [{ type: String }],
  status:     { type: String, enum: ['sent', 'failed'], default: 'sent' },
  sentAt:     { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', emailSchema);