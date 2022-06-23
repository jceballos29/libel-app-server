const { Router } = require('express');
const { AuthController } = require('../controllers');

const { validate } = require('../middleware/auth');

const router = Router();

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/verify', validate, AuthController.verify);


module.exports = router;  