/** @format */

const { Router } = require('express');
const passport = require('passport');
const { AuthController } = require('../controllers');

const { checkAuth } = require('../middleware/auth');

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout', checkAuth, AuthController.logout);
router.get('/verify', checkAuth, AuthController.verify);

router.get('/delete', (req, res) => {
  res.send('delete');
})

router.get('/google',passport.authenticate('google', {scope: ['email', 'profile'],}));
router.get('/google/callback',passport.authenticate('google', { session: false }),AuthController.providerLogin);

router.get("/facebook",passport.authenticate("facebook",{scope:["email"]}))
router.get("/facebook/callback",passport.authenticate("facebook",{session:false}), AuthController.providerLogin);

module.exports = router;
