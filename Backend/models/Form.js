// models/form.js

const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: String, // Store the header image URL
  questions: [
    {
      text: String,
      type: { type: String, enum: ['text', 'grid', 'checkbox'], required: true },
      options: [String],
      gridRows: [String],
    },
  ],
});

module.exports = mongoose.model('Form', FormSchema);
