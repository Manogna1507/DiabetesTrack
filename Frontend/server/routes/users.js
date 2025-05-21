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

// Simulated users database
// In a real app, this would be in MongoDB
const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$X7VYtyaYMFJA.zgbpQX1Dul0qeZ/YsVtY5zBF1nCZEKPLLGFU0Fq.', // hashed 'password123'
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    phoneNumber: '(555) 123-4567'
  }
];

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Find user by ID
    const user = users.find(user => user._id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, dateOfBirth, gender, phoneNumber } = req.body;

    // Find user by ID
    const userIndex = users.findIndex(user => user._id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      dateOfBirth: dateOfBirth || users[userIndex].dateOfBirth,
      gender: gender || users[userIndex].gender,
      phoneNumber: phoneNumber || users[userIndex].phoneNumber
    };

    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;