const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usermodel');
const config = require('../config');

const register = async (req, res) => {
  const { email, password, name, company } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.createUser({ email, password: hashedPassword, name, company }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User registered' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  });
};

const getProfile = (req, res) => {
  console.log('Fetching profile for user ID:', req.userId);
  userModel.findUserById(req.userId, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(results[0]);
  });
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = {
      name,
      email,
      password: hashedPassword,
      company
    };

    userModel.updateUser(req.userId, updatedUser, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);  
        return res.status(500).json({ error: 'Failed to update user' });
      }
      res.json({ message: 'Profile updated successfully' });
    });
  } catch (error) {
    console.error('Error in updateProfile function:', error);  
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
