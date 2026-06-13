import express from 'express';
import { getCourseReport } from '../controller/reportController.js';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/courses', auth, admin, getCourseReport);

export default router;
