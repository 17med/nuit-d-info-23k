require('dotenv').config()
const jwt = require('jsonwebtoken')


const userMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = verfiyToken(token)
        if (!decoded) return res.status(401).json({error: "Invalid token"})
        next()
    }

    catch (err) {
        return res.status(401).json({error: "Not availble token"})
    }
}
const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verfiyToken(token);
        console.log(token)
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        if (decoded.role === "admin") {
            // If the role is admin, allow the request to proceed
            req.user = decoded; // Optionally, you can attach the decoded user information to the request
            next();
        } else {
            // If the role is not admin, deny the request
            return res.status(403).json({ error: "Permission denied" });
        }
    } catch (err) {
        return res.status(401).json({ error: "Not available token" });
    }
}
const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        return decoded
    } catch(err) {
        return
    }
}

module.exports = {userMiddleware,isAdmin}