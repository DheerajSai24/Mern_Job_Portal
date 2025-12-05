import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token and authenticate user
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired'
    });
  }
};

// Check if user is a recruiter
export const isRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Recruiter privileges required.'
    });
  }
  next();
};

// Check if user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};
