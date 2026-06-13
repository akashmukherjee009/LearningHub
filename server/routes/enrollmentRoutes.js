import express from 'express';
import {
  getMyEnrolledCourses,
  updateProgress,
} from '../controller/enrollmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/me/courses', auth, getMyEnrolledCourses);
router.patch('/:enrollmentId/progress', auth, updateProgress);

export default router;
