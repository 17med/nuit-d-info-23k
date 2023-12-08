require('dotenv').config()
const User = require('../models/userSchema')
const { verfiyToken, createToken } = require('../hooks/useToken')


// Login Controller
const loginUser = async (req, res) => {
    const { pseudo, password } = req.body

    User.login(pseudo, password)
    .then(user => {
        const token = createToken(user._id,  user.name , user.pseudo, user.role, user.email)
        res.status(201).json({pseudo, token: token})
    })
    .catch(err => res.status(400).json({error: err.message}))
}

// Signup Controller
const signupUser = async (req, res) => {
    const {name, pseudo, password, role, email} = req.body

    User.signup(name, pseudo, password, role, email)
    .then(user => {
        const token = createToken(user._id, user.pseudo, user.role, user.email)
        res.status(201).json({name, pseudo, role, email, token})
    })
    .catch(err => res.status(400).json({error: err.message}))
}
const test = async (req, res) => {

        res.status(201).json('hahahah')

   
}
// Is logged in or not
const isLogin = (req, res) => {
    const { token } = req.body
    const decoded = verfiyToken(token)
    if (!decoded) return res.status(401).json({error: "Invalid token"})
    res.json(decoded)
}

module.exports = { loginUser, signupUser, isLogin, test }