const {Router} = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')
const router = Router()

router.post('/register',authController.registerUser)
router.post('/login',authController.userLogin)
router.get('/getme',authMiddleware.authUser, authController.getMe)
router.get('/logout',authMiddleware.authUser, authController.logout)

module.exports = router