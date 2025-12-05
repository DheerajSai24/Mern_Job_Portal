import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register or login user with Clerk
// @route   POST /api/users/webhook
// @access  Public
export const clerkWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'user.created' || type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = data;

      const userData = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        profileImage: image_url || ''
      };

      const user = await User.findOneAndUpdate(
        { clerkId: id },
        userData,
        { upsert: true, new: true }
      );

      return res.status(200).json({ success: true, user });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('applications');
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location, skills, experience, education, resume } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.skills = skills || user.skills;
    user.experience = experience || user.experience;
    user.education = education || user.education;
    user.resume = resume || user.resume;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user by Clerk ID
// @route   GET /api/users/clerk/:clerkId
// @access  Public
export const getUserByClerkId = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
