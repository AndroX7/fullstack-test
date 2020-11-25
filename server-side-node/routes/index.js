const router = require('express').Router();
const UserController = require('../controllers/user-controller.js');
const authentication = require('../middlewares/authentication.js')
router.post('/login', UserController.postLogin);
router.post('/register', UserController.postRegister);
router.use(authentication)
router.get('/', UserController.getContent)
module.exports = router;
