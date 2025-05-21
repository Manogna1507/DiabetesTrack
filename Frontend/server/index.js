import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import reportRoutes from './routes/reports.js';
import userRoutes from './routes/users.js';
import predictionModel from './models/predictionModel.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// In a production environment, you would use process.env.MONGODB_URI
// For this example, we'll just log that we would connect to MongoDB
console.log('Would connect to MongoDB in a real environment');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Prediction endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigree,
      age
    } = req.body;

    // In a real app, this would use the ML model to make a prediction
    const predictionResult = await predictionModel.predict({
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness, 
      insulin,
      bmi,
      diabetesPedigree,
      age
    });

    res.status(200).json({ prediction: predictionResult });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ message: 'Error making prediction', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;