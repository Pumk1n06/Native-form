// routes/formRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const FormModel = require('../models/FormModel');
const router = express.Router();
const app = express();
app.use(bodyParser.json());

// Define the create form route explicitly
router.post('/create', async (req, res) => {
    try {
      const { title, headerImage, questions } = req.body;
  
      if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required.' });
      }
  
      const newForm = new FormModel({ title, headerImage, questions });
      const savedForm = await newForm.save();
  
      res.status(201).json({
        success: true,
        message: 'Form created successfully!',
        data: savedForm,
      });
    } catch (error) {
      console.error('Error in /create:', error); // Log the exact error
      res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
  });

// Dynamic route for fetching forms by ID (place this after /create)
router.get('/:id', async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    res.json({ success: true, data: form });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
