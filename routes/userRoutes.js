const express = require('express')
const {isAdmin} = require('../middlewares/userMiddleware')

const router = express.Router()


const { loginUser, signupUser, isLogin, test, getScore } = require('../controllers/userControllers')


// Auth
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/islogin', isLogin)
router.post('/test',isAdmin, test)
router.get('/score/:pseudo', getScore)

module.exports = router