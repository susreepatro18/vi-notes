const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Session = require('./models/Session');
const { analyzeKeystrokes } = require('./analysisService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/vinotes';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/sessions', async (req, res) => {
  try {
    const { userId, content, keystrokes, pastes } = req.body;
    
    const analysis = analyzeKeystrokes(keystrokes);

    const newSession = new Session({
      userId,
      content,
      keystrokes,
      pastes,
      analysis
    });
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

app.get('/api/sessions/:userId', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
