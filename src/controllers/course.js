/** @format */

const { CourseService } = require('../services');
const responses = require('../utils/responses');

const getAll = async (req, res) => {
  try {
    const courses = await CourseService.getAll();
    if (courses) {
      return responses.success(res, courses, 'Courses found');
    }
    return responses.error(res, 'No courses found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const getById = async (req, res) => {
  try {
    const course = await CourseService.getById(req.params.id);
    if (course) {
      return responses.success(res, course, 'Course found');
    }
    return responses.error(res, 'Course not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const getBySlug = async (req, res) => {
  try {
    const course = await CourseService.getBySlug(req.params.slug);
    if (course) {
      return responses.success(res, course, 'Course found');
    }
    return responses.error(res, 'Course not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const create = async (req, res) => {
  try {
    const course = await CourseService.create(req.body);
    return responses.success(res, course, 'Course created');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const addUnit = async (req, res) => {
  try {
    const unit = await CourseService.addUnit(req.params.id, req.body);
    if (unit) {
      return responses.success(res, unit, 'Unit added successfully');
    }
    return responses.error(res, 'Unit not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const deleteUnit = async (req, res) => {
  try {
    const unit = await CourseService.deleteUnit(req.params.unitId);
    if (unit) {
      return responses.success(
        res,
        unit,
        'Unit deleted successfully'
      );
    }
    return responses.error(res, 'Unit not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const addLesson = async (req, res) => {
  try {
    const lesson = await CourseService.addLesson(
      req.params.id,
      req.params.unitId,
      req.body
    );
    if (lesson) {
      return responses.success(
        res,
        lesson,
        'Lesson added successfully'
      );
    }
    return responses.error(res, 'Lesson not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await CourseService.deleteLesson(
      req.params.lessonId
    );
    if (lesson) {
      return responses.success(
        res,
        lesson,
        'Lesson deleted successfully'
      );
    }
    return responses.error(res, 'Lesson not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const update = async (req, res) => {
  try {
    const course = await CourseService.update(req.params.id, req.body);
    if (course) {
      return responses.success(res, course, 'Course updated successfully');
    }
    return responses.error(res, 'Course not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const remove = async (req, res) => {
  try {
    const course = await CourseService.delete(req.params.id);
    if (course) {
      return responses.success(res, course, 'Course deleted successfully');
    }
    return responses.error(res, 'Course not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  addUnit,
  deleteUnit,
  addLesson,
  deleteLesson,
  update,
  remove,
};
