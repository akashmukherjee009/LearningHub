import enrollmentService from '../services/enrollmentService.js';

const getCourseReport = async (req, res, next) => {
  try {
    const report = await enrollmentService.getAdminCourseReport();
    res.json(report);
  } catch (error) {
    next(error);
  }
};

export {
  getCourseReport,
};
