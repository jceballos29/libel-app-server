const { Router } = require('express');
const { UserController } = require('../controllers');

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/username/:username', UserController.getUserByUsername);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;