require('dotenv').config()
const jwt = require('jsonwebtoken')
const {PrismaClient} = require("@prisma/client/edge");
const prisma = new PrismaClient()
// Create Token
const createToken = (_id, name, pseudo, role, email) => {
    return jwt.sign({_id, email, pseudo, role, email}, process.env.SECRET, {expiresIn: '3d'})
}

// Verify Token
const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        return decoded
    } catch(err) {
        return
    }
}

module.exports = { createToken, verfiyToken }