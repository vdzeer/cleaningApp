const Router = require('express');
const router = new Router();
const validator = require('../middlewares/validator');
const AuthController = require('../controllers/auth');

router.post('/reg', [
  validator({
    email: ['required', 'email'],
    password: ['required', 'min:6', 'max:25'],
  }),
  AuthController.register,
]);
router.post('/login', AuthController.login);
router.post('/reset', AuthController.reset);

module.exports = router;
