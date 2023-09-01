const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  path: String
});

module.exports = mongoose.model('File', fileSchema);
