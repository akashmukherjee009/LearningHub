import mongoose from 'mongoose';
import Course from '../model/Course.js';
import Quiz from '../model/Quiz.js';
import QuizAttempt from '../model/QuizAttempt.js';

const quizFields = ['title', 'description', 'order', 'questions'];
const maxQuizzesPerCourse = 2;

const pickFields = (payload, allowedFields) => {
  const data = {};

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      data[field] = payload[field];
    }
  });

  return data;
};

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildCourseQuery = (courseId) => {
  if (mongoose.Types.ObjectId.isValid(courseId)) {
    return { _id: courseId };
  }

  return { slug: courseId };
};

const findCourseOrFail = async (courseId) => {
  const course = await Course.findOne(buildCourseQuery(courseId));

  if (!course) {
    throw createError('Course not found', 404);
  }

  return course;
};

const findQuizOrFail = async (quizId) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw createError('Quiz not found', 404);
  }

  return quiz;
};

const sanitizeQuestion = (question) => {
  const questionObject = question.toObject ? question.toObject() : question;

  return {
    ...questionObject,
    answers: questionObject.answers.map((answer) => {
      const answerObject = answer.toObject ? answer.toObject() : answer;
      delete answerObject.isCorrect;
      return answerObject;
    }),
  };
};

const getCourseQuizzes = async (courseId) => {
  const course = await findCourseOrFail(courseId);

  return Quiz.find({ course: course._id })
    .select('-questions.answers.isCorrect')
    .sort({ order: 1, createdAt: 1 });
};

const createQuiz = async (courseId, payload) => {
  const course = await findCourseOrFail(courseId);
  const quizCount = await Quiz.countDocuments({ course: course._id });

  if (quizCount >= maxQuizzesPerCourse) {
    throw createError('Each course can have only 2 quizzes', 400);
  }

  return Quiz.create({
    ...pickFields(payload, quizFields),
    course: course._id,
  });
};

const updateQuiz = async (quizId, payload) => {
  const quiz = await findQuizOrFail(quizId);
  const updates = pickFields(payload, quizFields);

  Object.entries(updates).forEach(([field, value]) => {
    quiz[field] = value;
  });

  await quiz.save();
  return quiz;
};

const deleteQuiz = async (quizId) => {
  const quiz = await findQuizOrFail(quizId);
  await QuizAttempt.deleteMany({ quiz: quiz._id });
  await quiz.deleteOne();

  return quiz;
};

const getQuizQuestions = async (quizId) => {
  const quiz = await findQuizOrFail(quizId);

  return quiz.questions
    .sort((firstQuestion, secondQuestion) => (
      firstQuestion.order - secondQuestion.order
    ))
    .map(sanitizeQuestion);
};

const normalizeSubmittedAnswers = (answers) => {
  if (!Array.isArray(answers)) {
    throw createError('Answers must be an array', 400);
  }

  return new Map(
    answers.map((answer) => [
      answer.questionId || answer.question,
      answer.answerId || answer.selectedAnswer,
    ]),
  );
};

const submitQuiz = async (quizId, studentId, payload) => {
  const quiz = await findQuizOrFail(quizId);
  const submittedAnswers = normalizeSubmittedAnswers(payload.answers);
  let score = 0;

  const evaluatedAnswers = quiz.questions.map((question) => {
    const selectedAnswerId = submittedAnswers.get(question._id.toString());

    if (!selectedAnswerId) {
      throw createError('Every question must have a selected answer', 400);
    }

    const selectedAnswer = question.answers.id(selectedAnswerId);

    if (!selectedAnswer) {
      throw createError('Selected answer does not belong to this quiz', 400);
    }

    const isCorrect = selectedAnswer.isCorrect;

    if (isCorrect) {
      score += 1;
    }

    return {
      question: question._id,
      selectedAnswer: selectedAnswer._id,
      isCorrect,
    };
  });

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return QuizAttempt.create({
    course: quiz.course,
    quiz: quiz._id,
    student: studentId,
    score,
    totalQuestions,
    percentage,
    answers: evaluatedAnswers,
  });
};

export default {
  getCourseQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizQuestions,
  submitQuiz,
};
