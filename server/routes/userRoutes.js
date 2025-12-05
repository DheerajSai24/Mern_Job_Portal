import express from 'express';
import { 
  clerkWebhook,
  getUserProfile,
  updateUserProfile,
  getUserByClerkId
} from '../controllers/userController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/webhook', clerkWebhook);
router.get('/clerk/:clerkId', getUserByClerkId);

// Protected routes
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);

export default router;
