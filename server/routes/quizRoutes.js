import express from 'express';
import {
  deleteQuiz,
  getQuizQuestions,
  submitQuiz,
  updateQuiz,
} from '../controller/quizController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:quizId/questions', getQuizQuestions);
router.post('/:quizId/submit', auth, submitQuiz);
router.patch('/:quizId', updateQuiz);
router.delete('/:quizId', deleteQuiz);

export default router;
