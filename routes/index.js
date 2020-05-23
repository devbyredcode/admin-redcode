const router = require('express').Router();
const AuthController = require('../controller/AuthController');
const auth = require('../middleware/authHandler');

router.get('/', AuthController.viewLogin);
router.post('/login', AuthController.actionLogin);

router.use(auth);
router.get('/logout', AuthController.actionLogout);

module.exports = router;
