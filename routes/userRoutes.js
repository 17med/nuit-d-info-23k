const express = require('express')
const { loginUser, signupUser, isLogin,testUser } = require('../controllers/userControllers')
const {isAdmin } = require('../middlewares/userMiddleware')


const router = express.Router()




// Auth
router.post('/login', loginUser)
router.get('/test', isAdmin, testUser);
router.post('/signup', signupUser)


router.post('/islogin', isLogin)

module.exports = router