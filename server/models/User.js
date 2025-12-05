import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'recruiter', 'admin'],
    default: 'user'
  },
  resume: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  experience: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
