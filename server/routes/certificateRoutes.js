import express from 'express';
import { getCertificateData } from '../controller/enrollmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:enrollmentId', auth, getCertificateData);

export default router;
