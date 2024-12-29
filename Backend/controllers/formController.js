// controllers/formController.js

const Form = require('../models/form');

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newForm = new Form({ title, questions });
    await newForm.save();
    res.status(201).json({ message: 'Form created successfully', form: newForm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a form by its ID
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit form responses
exports.submitFormResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Store the responses
    form.responses.push(responses);
    await form.save();

    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
