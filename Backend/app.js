// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/FormBuilders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error: ', error));

// Routes
app.use('/api/forms', formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set up multer upload
const upload = multer({ storage });

app.post('/api/forms/uploadImage', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// app.js (backend)

app.post('/api/forms/create', async (req, res) => {
    const { title, headerImage, questions } = req.body;
  
    try {
      const newForm = new Form({
        title,
        headerImage,
        questions,
      });
  
      await newForm.save();
      res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Failed to create form' });
    }
  });
  