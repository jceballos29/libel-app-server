const { Router } = require('express');
const { UserController } = require('../controllers');
const { checkAuth, checkRole, checkOwner } = require('../middleware/auth');

const router = Router();

router.get('/', checkAuth, checkRole(["admin"]), UserController.getAllUsers);
router.get('/:id', checkAuth, checkRole(["admin"]), UserController.getUserById);
router.get('/username/:username', UserController.getUserByUsername);
router.post('/', checkAuth, checkRole(["admin"]), UserController.createUser);
router.put('/:id', checkAuth, checkOwner, UserController.updateUser);
router.delete('/:id',checkAuth, checkOwner, UserController.deleteUser);

module.exports = router;