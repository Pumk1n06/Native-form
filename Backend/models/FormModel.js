const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },  // e.g., "text", "checkbox", "grid"
  text: { type: String, required: true },
  checkboxOptions: [String], // Optional for checkbox-type questions
  gridRows: [String],       // Optional for grid-type questions
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: String, // Optional
  questions: [questionSchema], // Array of questions
});

module.exports = mongoose.model('FormModel', formSchema);
