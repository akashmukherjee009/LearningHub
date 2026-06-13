import express from 'express';
import {
  addCourseModule,
  createCourse,
  deleteCourse,
  deleteCourseModule,
  getCourse,
  getCourseModule,
  getCourseModules,
  getCourses,
  updateCourse,
  updateCourseModule,
} from '../controller/courseController.js';
import {
  createQuiz,
  getCourseQuizzes,
} from '../controller/quizController.js';
import { enrollInCourse } from '../controller/enrollmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.get('/:courseId', getCourse);
router.patch('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse);

router.get('/:courseId/modules', getCourseModules);
router.post('/:courseId/modules', addCourseModule);
router.get('/:courseId/modules/:moduleId', getCourseModule);
router.patch('/:courseId/modules/:moduleId', updateCourseModule);
router.delete('/:courseId/modules/:moduleId', deleteCourseModule);

router.get('/:courseId/quizzes', getCourseQuizzes);
router.post('/:courseId/quizzes', createQuiz);
router.post('/:courseId/enroll', auth, enrollInCourse);

export default router;
