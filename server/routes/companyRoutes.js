import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getRecruiterCompanies
} from '../controllers/companyController.js';
import { authenticateUser, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

// Protected routes - Recruiter only
router.post('/', authenticateUser, isRecruiter, createCompany);
router.put('/:id', authenticateUser, isRecruiter, updateCompany);
router.delete('/:id', authenticateUser, isRecruiter, deleteCompany);
router.get('/recruiter/my-companies', authenticateUser, isRecruiter, getRecruiterCompanies);

export default router;
