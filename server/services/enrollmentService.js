import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import Course from '../model/Course.js';
import Enrollment from '../model/Enrollment.js';
import QuizAttempt from '../model/QuizAttempt.js';

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

const createEnrollmentNo = () => {
  return `ENR-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
};

const createCertificateNo = () => {
  return `CERT-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
};

const calculateCompletion = (course, completedModules) => {
  if (!course.modules.length) {
    return 100;
  }

  return Math.round((completedModules.length / course.modules.length) * 100);
};

const normalizeModuleIds = (moduleIds) => {
  if (!Array.isArray(moduleIds)) {
    throw createError('completedModules must be an array', 400);
  }

  return [...new Set(moduleIds.map((moduleId) => moduleId.toString()))];
};

const ensureModulesBelongToCourse = (course, moduleIds) => {
  const courseModuleIds = new Set(
    course.modules.map((module) => module._id.toString()),
  );

  const hasInvalidModule = moduleIds.some((moduleId) => (
    !courseModuleIds.has(moduleId)
  ));

  if (hasInvalidModule) {
    throw createError('Completed module does not belong to this course', 400);
  }
};

const applyCertificateStatus = (enrollment) => {
  if (enrollment.completionPercentage === 100) {
    enrollment.certificateAvailable = true;

    if (!enrollment.certificateNo) {
      enrollment.certificateNo = createCertificateNo();
    }

    if (!enrollment.certificateIssuedAt) {
      enrollment.certificateIssuedAt = new Date();
    }
  } else {
    enrollment.certificateAvailable = false;
    enrollment.certificateNo = '';
    enrollment.certificateIssuedAt = null;
  }
};

const formatEnrolledCourse = (enrollment) => ({
  enrollmentId: enrollment._id,
  enrollmentNo: enrollment.enrollmentNo,
  course: enrollment.course,
  completedModules: enrollment.completedModules,
  completionPercentage: enrollment.completionPercentage,
  certificateAvailable: enrollment.certificateAvailable,
  certificateNo: enrollment.certificateNo,
  certificateIssuedAt: enrollment.certificateIssuedAt,
  enrolledAt: enrollment.createdAt,
});

const enrollInCourse = async (courseId, studentId) => {
  const course = await findCourseOrFail(courseId);
  const existingEnrollment = await Enrollment.findOne({
    course: course._id,
    student: studentId,
  }).populate('course');

  if (existingEnrollment) {
    return formatEnrolledCourse(existingEnrollment);
  }

  const enrollment = await Enrollment.create({
    enrollmentNo: createEnrollmentNo(),
    student: studentId,
    course: course._id,
  });

  await enrollment.populate('course');
  return formatEnrolledCourse(enrollment);
};

const updateProgress = async (enrollmentId, studentId, payload) => {
  const enrollment = await Enrollment.findById(enrollmentId).populate('course');

  if (!enrollment) {
    throw createError('Enrollment not found', 404);
  }

  if (enrollment.student.toString() !== studentId.toString()) {
    throw createError('You can update only your own progress', 403);
  }

  const completedModules = normalizeModuleIds(payload.completedModules);
  ensureModulesBelongToCourse(enrollment.course, completedModules);

  enrollment.completedModules = completedModules;
  enrollment.completionPercentage = calculateCompletion(
    enrollment.course,
    completedModules,
  );
  applyCertificateStatus(enrollment);

  await enrollment.save();
  return formatEnrolledCourse(enrollment);
};

const getStudentEnrolledCourses = async (studentId) => {
  const enrollments = await Enrollment.find({ student: studentId })
    .populate('course')
    .sort({ createdAt: -1 });

  return enrollments.map(formatEnrolledCourse);
};

const getCertificateData = async (enrollmentId, requester) => {
  const enrollment = await Enrollment.findById(enrollmentId)
    .populate('course')
    .populate('student', 'name email collegeName class city');

  if (!enrollment) {
    throw createError('Enrollment not found', 404);
  }

  const isOwner = enrollment.student._id.toString() === requester.id.toString();

  if (!isOwner && requester.role !== 'admin') {
    throw createError('You can fetch only your own certificate', 403);
  }

  if (!enrollment.certificateAvailable) {
    throw createError('Certificate is not available yet', 400);
  }

  return {
    certificateNo: enrollment.certificateNo,
    issuedAt: enrollment.certificateIssuedAt,
    enrollmentNo: enrollment.enrollmentNo,
    completionPercentage: enrollment.completionPercentage,
    student: enrollment.student,
    course: enrollment.course,
  };
};

const getAdminCourseReport = async () => {
  const courses = await Course.find().sort({ createdAt: -1 });
  const enrollments = await Enrollment.find()
    .populate('student', 'name email collegeName class city')
    .populate('course')
    .sort({ createdAt: -1 });
  const attempts = await QuizAttempt.find()
    .populate('quiz', 'title')
    .sort({ createdAt: -1 });

  return courses.map((course) => {
    const courseEnrollments = enrollments.filter((enrollment) => (
      enrollment.course._id.toString() === course._id.toString()
    ));

    return {
      course,
      totalStudents: courseEnrollments.length,
      certificatesIssued: courseEnrollments.filter((enrollment) => (
        enrollment.certificateAvailable
      )).length,
      students: courseEnrollments.map((enrollment) => ({
        student: enrollment.student,
        enrollmentId: enrollment._id,
        enrollmentNo: enrollment.enrollmentNo,
        completionPercentage: enrollment.completionPercentage,
        certificateAvailable: enrollment.certificateAvailable,
        certificateNo: enrollment.certificateNo,
        certificateIssuedAt: enrollment.certificateIssuedAt,
        enrolledAt: enrollment.createdAt,
        quizAttempts: attempts
          .filter((attempt) => (
            attempt.course.toString() === course._id.toString()
            && attempt.student.toString() === enrollment.student._id.toString()
          ))
          .map((attempt) => ({
            quiz: attempt.quiz,
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
            percentage: attempt.percentage,
            submittedAt: attempt.createdAt,
          })),
      })),
    };
  });
};

export default {
  enrollInCourse,
  updateProgress,
  getStudentEnrolledCourses,
  getCertificateData,
  getAdminCourseReport,
};
