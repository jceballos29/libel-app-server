const { Router } = require('express');
const { CategoryController } = require('../controllers');
const { checkAuth, checkRole, checkOwner } = require('../middleware/auth');


const router = Router();


router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', checkAuth, checkRole(["admin", "teacher"]), CategoryController.create);
router.put('/:id', checkAuth, checkRole(["admin", "teacher"]), CategoryController.update);
router.delete('/:id', checkAuth, checkRole(["admin", "teacher"]), CategoryController.remove);


module.exports = router;