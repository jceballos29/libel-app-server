/** @format */

const { Course, Unit, Lesson } = require('../models');
const slugify = require('slugify');

class CourseService {
  static async getAll() {
    try {
      const courses = await Course.find()
        .populate({
          path: 'category',
          model: 'Category',
          select: 'name',
        })
        .populate({
          path: 'curriculum.units',
          model: 'Unit',
          populate: {
            path: 'lessons',
            model: 'Lesson',
          },
        });
      if (courses.length > 0) {
        return courses;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const course = await Course.findById(id)
        .populate({
          path: 'category',
          model: 'Category',
          select: 'name',
        })
        .populate({
          path: 'curriculum.units',
          model: 'Unit',
          populate: {
            path: 'lessons',
            model: 'Lesson',
          },
        });
      return course;
    } catch (error) {
      throw error;
    }
  }

  static async getBySlug(slug) {
    try {
      const course = await Course.findOne({ where: { slug } })
        .populate({
          path: 'category',
          model: 'Category',
          select: 'name',
        })
        .populate({
          path: 'curriculum.units',
          model: 'Unit',
          populate: {
            path: 'lessons',
            model: 'Lesson',
          },
        });
      return course;
    } catch (error) {
      throw error;
    }
  }

  static async create(course) {
    try {
      course.slug = slugify(course.title, {
        lower: true,
        trim: true,
      });
      const result = await Course.create(course);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async addUnit(id, data) {
    try {
      const course = await Course.findById(id);
      if (course) {
        const unit = new Unit({
          _course: id,
          ...data,
        });
        await unit.save();
        course.curriculum.units.push(unit);
        await course.save();
        return unit;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUnit(id) {
    try {
      const unit = await Unit.findById(id);
      if (!unit) return false;
      const course = await Course.findById(unit._course);
      if (!course) return false;
      course.curriculum.totalLessons -= unit.lessons.length;
      course.curriculum.units = course.curriculum.units.filter(
        (u) => u._id.toString() !== id
      );
      unit.lessons.forEach(async (l) => {
        await Lesson.findByIdAndRemove(l._id);
      });
      await course.save();
      await unit.remove();
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addLesson(id, unitId, data) {
    try {
      const course = await Course.findById(id);
      if (!course) return null;
      const unit = await Unit.findById(unitId);
      if (!unit) return null;
      const lesson = new Lesson({
        _unit: unitId,
        ...data,
      });
      await lesson.save();
      unit.lessons.push(lesson);
      await unit.save();
      course.curriculum.totalLessons += 1;
      await course.save();
      return lesson;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteLesson(lessonId) {
    try {
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) return false;
      const unit = await Unit.findById(lesson._unit);
      if (!unit) return false;
      const course = await Course.findById(unit._course);
      unit.lessons = unit.lessons.pull(lessonId);
      course.curriculum.totalLessons -= 1;
      await course.save();
      await unit.save();
      await lesson.remove();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, course) {
    try {
      const result = await Course.findByIdAndUpdate(id, course, {
        new: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const course = await Course.findById(id);
      if (!course) return false;
      course.curriculum.units.forEach(async (u) => {
        const unit = await Unit.findById(u._id);
        unit.lessons.forEach(async (l) => {
          await Lesson.findByIdAndRemove(l._id);
        })
        await unit.remove();
      });
      await course.remove();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CourseService;
