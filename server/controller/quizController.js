import quizService from '../services/quizService.js';

const getCourseQuizzes = async (req, res, next) => {
  try {
    const quizzes = await quizService.getCourseQuizzes(req.params.courseId);
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

const createQuiz = async (req, res, next) => {
  try {
    const quiz = await quizService.createQuiz(req.params.courseId, req.body);
    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await quizService.updateQuiz(req.params.quizId, req.body);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await quizService.deleteQuiz(req.params.quizId);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

const getQuizQuestions = async (req, res, next) => {
  try {
    const questions = await quizService.getQuizQuestions(req.params.quizId);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const submitQuiz = async (req, res, next) => {
  try {
    const attempt = await quizService.submitQuiz(
      req.params.quizId,
      req.user.id,
      req.body,
    );
    res.status(201).json(attempt);
  } catch (error) {
    next(error);
  }
};

export {
  getCourseQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizQuestions,
  submitQuiz,
};
