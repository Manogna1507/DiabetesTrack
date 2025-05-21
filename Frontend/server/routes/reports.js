import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate JWT token
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // In a real app, use process.env.JWT_SECRET
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Simulated reports database
// In a real app, this would be in MongoDB
const reports = [
  {
    _id: '1',
    userId: '1',
    pregnancies: 0,
    glucose: 135,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 90,
    bmi: 24.5,
    diabetesPedigree: 0.5,
    age: 35,
    prediction: 0.25,
    date: '2023-01-15T00:00:00.000Z'
  },
  {
    _id: '2',
    userId: '1',
    pregnancies: 0,
    glucose: 125,
    bloodPressure: 75,
    skinThickness: 19,
    insulin: 85,
    bmi: 23.8,
    diabetesPedigree: 0.5,
    age: 35,
    prediction: 0.2,
    date: '2023-02-15T00:00:00.000Z'
  }
];

// @route   GET api/reports
// @desc    Get all reports for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get reports for the authenticated user
    const userReports = reports.filter(report => report.userId === req.user.id);
    res.json(userReports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/reports
// @desc    Create a new report
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigree,
      age,
      prediction
    } = req.body;

    // Create new report
    const newReport = {
      _id: (reports.length + 1).toString(),
      userId: req.user.id,
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigree,
      age,
      prediction,
      date: new Date().toISOString()
    };

    // Save report to database (simulated)
    reports.push(newReport);

    res.status(201).json(newReport);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/reports/:id
// @desc    Get a specific report
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Find report by ID and check ownership
    const report = reports.find(
      report => report._id === req.params.id && report.userId === req.user.id
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;