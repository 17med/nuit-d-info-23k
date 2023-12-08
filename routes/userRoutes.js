const express = require('express')
const { loginUser, signupUser, isLogin, test } = require('../controllers/userControllers')
const {isAdmin} = require('../middlewares/userMiddleware')

const router = express.Router()




// Auth
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/islogin', isLogin)
router.post('/test',isAdmin, test)

module.exports = router