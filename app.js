 require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('./middlewares/cors')
const { forwardind_errors, handling_errors } = require('./middlewares/errors')
const usersRoutes = require('./routes/userRoutes')


// ----------Express App----------------
const app = express()
mongoose.set('strictQuery', true)
// const dbURI = 'mongodb+srv://younes:97286305.@cluster0.z6o0ewk.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(process.env.dbURI)
    .then((result) => app.listen(3000, () => console.log('*** Server listening ***')))
    .catch((err) => console.log(err))


// ----------Middleware----------------
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors)

// ----------Routes----------------
app.use('/users', usersRoutes)


// ----------Errors----------------
app.use(forwardind_errors)
app.use(handling_errors)

module.exports = app