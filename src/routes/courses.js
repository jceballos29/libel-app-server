/** @format */

const { Router } = require('express');
const { CourseController } = require('../controllers');

const router = Router();


router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.get('/slug/:slug', CourseController.getBySlug);
router.post('/', CourseController.create);
router.post('/:id/units', CourseController.addUnit);
router.post('/:id/units/:unitId/lessons', CourseController.addLesson);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.remove);
router.delete('/units/:unitId', CourseController.deleteUnit);
router.delete('/lessons/:lessonId', CourseController.deleteLesson);

module.exports = router;
