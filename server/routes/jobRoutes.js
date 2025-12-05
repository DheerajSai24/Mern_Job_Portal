import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs
} from '../controllers/jobController.js';
import { authenticateUser, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes - Recruiter only
router.post('/', authenticateUser, isRecruiter, createJob);
router.put('/:id', authenticateUser, isRecruiter, updateJob);
router.delete('/:id', authenticateUser, isRecruiter, deleteJob);
router.get('/recruiter/my-jobs', authenticateUser, isRecruiter, getRecruiterJobs);

export default router;
