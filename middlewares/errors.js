const forwardind_errors = (req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
}

const handling_errors = (error, req,  res, next) => {
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
}

module.exports = {
    forwardind_errors,
    handling_errors
}