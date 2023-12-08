const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    pseudo: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
    },

    level: {
        type: Number,
    },
    
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})



userSchema.statics.signup = async (name, pseudo, password, role, email) => {
    const roles = ['admin', 'user']
    if (!name || !pseudo || !password || !role|| !email) throw Error ('Fill in all the fields please')
    
    const existPseudo = await User.findOne({pseudo})
    if (existPseudo) throw Error ('This pseudo is already exist')
    
    const existEmail = await User.findOne({email})
    if (existEmail) throw Error ('This email is already exist')

    if (pseudo.includes(' ')) throw Error ('Invalid pseudo')

    if (!validator.isEmail(email)) throw Error ('Invalid email')

    if (!roles.includes(role)) throw Error ('Invalid role')



    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({name, role, email,  pseudo, password: hash})

    return user
}


userSchema.statics.login = async ( pseudo, password) => {

    if (!pseudo || !password) throw Error ('Fill in all the fields please')

    const user = await User.findOne({pseudo})

    if (!user) throw Error ('Incorrect pseudo')

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw Error ('Incorrect Password')

    return user
}

const User = mongoose.model('user', userSchema)

module.exports = User