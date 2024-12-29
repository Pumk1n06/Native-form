// routes/formRoutes.js

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/create', formController.createForm); // Create a new form
router.get('/:id', formController.getForm); // Get a form by ID
router.post('/submit', formController.submitFormResponse); // Submit a form response

module.exports = router;
