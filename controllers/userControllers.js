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

const getScore = async (req, res) => {
    const pseudo = req.params.pseudo;
    try {
        const user = await User.findOne({ pseudo });

        if (!user) {
            return res.status(404).send({
                error: 'User not found',
            });
        }

        res.status(200).send({
            score: user.score,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Internal Server Error',
        });
    }
};

module.exports = { loginUser, signupUser, isLogin, test, getScore }
