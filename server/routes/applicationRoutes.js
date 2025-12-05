import express from 'express';
import {
  applyForJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication
} from '../controllers/applicationController.js';
import { authenticateUser, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - User
router.post('/', authenticateUser, applyForJob);
router.get('/my-applications', authenticateUser, getUserApplications);
router.get('/:id', authenticateUser, getApplicationById);
router.delete('/:id', authenticateUser, deleteApplication);

// Protected routes - Recruiter only
router.get('/job/:jobId', authenticateUser, isRecruiter, getJobApplications);
router.put('/:id/status', authenticateUser, isRecruiter, updateApplicationStatus);

export default router;
