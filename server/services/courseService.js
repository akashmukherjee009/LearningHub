import mongoose from 'mongoose';
import Course from '../model/Course.js';

const courseFields = [
  'slug',
  'title',
  'description',
  'instructor',
  'duration',
  'level',
  'rating',
  'img',
  'modules',
];

const moduleFields = [
  'title',
  'description',
  'duration',
  'videoUrl',
  'content',
  'order',
];

const pickFields = (payload, allowedFields) => {
  const data = {};

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      data[field] = payload[field];
    }
  });

  return data;
};

const buildCourseQuery = (courseId) => {
  if (mongoose.Types.ObjectId.isValid(courseId)) {
    return { _id: courseId };
  }

  return { slug: courseId };
};

const createNotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

const findCourseOrFail = async (courseId) => {
  const course = await Course.findOne(buildCourseQuery(courseId));

  if (!course) {
    throw createNotFoundError('Course not found');
  }

  return course;
};

const findModuleOrFail = (course, moduleId) => {
  const module = course.modules.id(moduleId);

  if (!module) {
    throw createNotFoundError('Module not found');
  }

  return module;
};

const getCourses = () => {
  return Course.find().sort({ createdAt: -1 });
};

const getCourse = (courseId) => {
  return findCourseOrFail(courseId);
};

const createCourse = (payload) => {
  return Course.create(pickFields(payload, courseFields));
};

const updateCourse = async (courseId, payload) => {
  const course = await Course.findOneAndUpdate(
    buildCourseQuery(courseId),
    pickFields(payload, courseFields),
    {
      new: true,
      runValidators: true,
    },
  );

  if (!course) {
    throw createNotFoundError('Course not found');
  }

  return course;
};

const deleteCourse = async (courseId) => {
  const course = await Course.findOneAndDelete(buildCourseQuery(courseId));

  if (!course) {
    throw createNotFoundError('Course not found');
  }

  return course;
};

const getCourseModules = async (courseId) => {
  const course = await findCourseOrFail(courseId);
  return course.modules.sort((firstModule, secondModule) => (
    firstModule.order - secondModule.order
  ));
};

const getCourseModule = async (courseId, moduleId) => {
  const course = await findCourseOrFail(courseId);
  return findModuleOrFail(course, moduleId);
};

const addCourseModule = async (courseId, payload) => {
  const course = await findCourseOrFail(courseId);
  course.modules.push(pickFields(payload, moduleFields));
  await course.save();

  return course.modules[course.modules.length - 1];
};

const updateCourseModule = async (courseId, moduleId, payload) => {
  const course = await findCourseOrFail(courseId);
  const module = findModuleOrFail(course, moduleId);
  const updates = pickFields(payload, moduleFields);

  Object.entries(updates).forEach(([field, value]) => {
    module[field] = value;
  });

  await course.save();
  return module;
};

const deleteCourseModule = async (courseId, moduleId) => {
  const course = await findCourseOrFail(courseId);
  const module = findModuleOrFail(course, moduleId);

  course.modules.pull(moduleId);
  await course.save();

  return module;
};

export default {
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
