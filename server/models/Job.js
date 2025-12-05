import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  salary: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  level: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager'],
    default: 'Entry Level'
  },
  category: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', category: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;
