import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    default: '1-10'
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
}, {
  timestamps: true
});

const Company = mongoose.model('Company', companySchema);

export default Company;
