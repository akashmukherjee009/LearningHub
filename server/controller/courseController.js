import courseService from '../services/courseService.js';

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const course = await courseService.getCourse(req.params.courseId);
    res.json(course);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.courseId, req.body);
    res.json(course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req.params.courseId);
    res.json(course);
  } catch (error) {
    next(error);
  }
};

const getCourseModules = async (req, res, next) => {
  try {
    const modules = await courseService.getCourseModules(req.params.courseId);
    res.json(modules);
  } catch (error) {
    next(error);
  }
};

const getCourseModule = async (req, res, next) => {
  try {
    const module = await courseService.getCourseModule(
      req.params.courseId,
      req.params.moduleId,
    );
    res.json(module);
  } catch (error) {
    next(error);
  }
};

const addCourseModule = async (req, res, next) => {
  try {
    const module = await courseService.addCourseModule(req.params.courseId, req.body);
    res.status(201).json(module);
  } catch (error) {
    next(error);
  }
};

const updateCourseModule = async (req, res, next) => {
  try {
    const module = await courseService.updateCourseModule(
      req.params.courseId,
      req.params.moduleId,
      req.body,
    );
    res.json(module);
  } catch (error) {
    next(error);
  }
};

const deleteCourseModule = async (req, res, next) => {
  try {
    const module = await courseService.deleteCourseModule(
      req.params.courseId,
      req.params.moduleId,
    );
    res.json(module);
  } catch (error) {
    next(error);
  }
};

export {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseModules,
  getCourseModule,
  addCourseModule,
  updateCourseModule,
  deleteCourseModule,
};
