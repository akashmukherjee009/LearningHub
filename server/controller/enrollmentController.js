import enrollmentService from '../services/enrollmentService.js';

const enrollInCourse = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.enrollInCourse(
      req.params.courseId,
      req.user.id,
    );
    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.updateProgress(
      req.params.enrollmentId,
      req.user.id,
      req.body,
    );
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
};

const getMyEnrolledCourses = async (req, res, next) => {
  try {
    const enrollments = await enrollmentService.getStudentEnrolledCourses(
      req.user.id,
    );
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};

const getCertificateData = async (req, res, next) => {
  try {
    const certificate = await enrollmentService.getCertificateData(
      req.params.enrollmentId,
      req.user,
    );
    res.json(certificate);
  } catch (error) {
    next(error);
  }
};

export {
  enrollInCourse,
  updateProgress,
  getMyEnrolledCourses,
  getCertificateData,
};
