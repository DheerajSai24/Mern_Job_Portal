import Job from '../models/Job.js';
import Company from '../models/Company.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const { search, location, category, jobType, page = 1, limit = 10 } = req.query;

    const query = { status: 'active' };

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate('company', 'name logo location')
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company')
      .populate('recruiter', 'name email')
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
          select: 'name email profileImage'
        }
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      level,
      category,
      company,
      deadline
    } = req.body;

    // Verify company belongs to recruiter
    const companyDoc = await Company.findById(company);
    if (!companyDoc) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    if (companyDoc.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to post job for this company'
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      level,
      category,
      company,
      recruiter: req.user._id,
      deadline
    });

    // Add job to company's jobs array
    companyDoc.jobs.push(job._id);
    await companyDoc.save();

    const populatedJob = await Job.findById(job._id)
      .populate('company', 'name logo location')
      .populate('recruiter', 'name email');

    res.status(201).json({
      success: true,
      job: populatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter only)
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the recruiter who created the job
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('company', 'name logo location');

    res.status(200).json({
      success: true,
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter only)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the recruiter who created the job
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get jobs posted by recruiter
// @route   GET /api/jobs/recruiter/my-jobs
// @access  Private (Recruiter only)
export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id })
      .populate('company', 'name logo location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
