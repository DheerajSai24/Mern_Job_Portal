import Company from '../models/Company.js';
import Job from '../models/Job.js';

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
export const getAllCompanies = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const companies = await Company.find(query)
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(query);

    res.status(200).json({
      success: true,
      companies,
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

// @desc    Get single company by ID
// @route   GET /api/companies/:id
// @access  Public
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('recruiter', 'name email')
      .populate({
        path: 'jobs',
        match: { status: 'active' }
      });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create a new company
// @route   POST /api/companies
// @access  Private (Recruiter only)
export const createCompany = async (req, res) => {
  try {
    const { name, description, logo, website, location, industry, size } = req.body;

    const company = await Company.create({
      name,
      description,
      logo,
      website,
      location,
      industry,
      size,
      recruiter: req.user._id
    });

    const populatedCompany = await Company.findById(company._id)
      .populate('recruiter', 'name email');

    res.status(201).json({
      success: true,
      company: populatedCompany
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private (Recruiter only)
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Check if user is the recruiter who created the company
    if (company.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this company'
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('recruiter', 'name email');

    res.status(200).json({
      success: true,
      company: updatedCompany
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private (Recruiter only)
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Check if user is the recruiter who created the company
    if (company.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this company'
      });
    }

    // Delete all jobs associated with this company
    await Job.deleteMany({ company: company._id });

    await company.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Company and associated jobs deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get companies by recruiter
// @route   GET /api/companies/recruiter/my-companies
// @access  Private (Recruiter only)
export const getRecruiterCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ recruiter: req.user._id })
      .populate('jobs')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
