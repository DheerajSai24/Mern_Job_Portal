import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private
export const applyForJob = async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      company: job.company,
      resume,
      coverLetter
    });

    // Add application to job's applications array
    job.applications.push(application._id);
    await job.save();

    // Add application to user's applications array
    const user = await User.findById(req.user._id);
    user.applications.push(application._id);
    await user.save();

    const populatedApplication = await Application.findById(application._id)
      .populate('job', 'title salary location')
      .populate('company', 'name logo');

    res.status(201).json({
      success: true,
      application: populatedApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
// @access  Private
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title salary location jobType')
      .populate('company', 'name logo')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get applications for a specific job (Recruiter only)
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter only)
export const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the recruiter for this job
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email profileImage phone location skills experience')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update application status (Recruiter only)
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is the recruiter for this job
    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    if (notes) {
      application.notes = notes;
    }

    await application.save();

    const updatedApplication = await Application.findById(application._id)
      .populate('applicant', 'name email profileImage')
      .populate('job', 'title');

    res.status(200).json({
      success: true,
      application: updatedApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single application by ID
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('company')
      .populate('applicant', 'name email profileImage phone location skills experience education');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is either the applicant or the recruiter
    const isApplicant = application.applicant._id.toString() === req.user._id.toString();
    const isRecruiter = application.job.recruiter.toString() === req.user._id.toString();

    if (!isApplicant && !isRecruiter) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this application'
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Only applicant can delete their application
    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this application'
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
