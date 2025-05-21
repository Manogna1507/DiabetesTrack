import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simulated users database
// In a real app, this would be in MongoDB
const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$X7VYtyaYMFJA.zgbpQX1Dul0qeZ/YsVtY5zBF1nCZEKPLLGFU0Fq.' // hashed 'password123'
  }
];

// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = {
      _id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword
    };

    // Save user to database (simulated)
    users.push(user);

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      'your_jwt_secret', // In a real app, use process.env.JWT_SECRET
      { expiresIn: '1h' }
    );

    // Return token and user (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      'your_jwt_secret', // In a real app, use process.env.JWT_SECRET
      { expiresIn: '1h' }
    );

    // Return token and user (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;