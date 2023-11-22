const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
    try {
        const token = req.cookies.Authorization;
        const decoded = jwt.verify(token, process.env.SECRET);
        if (Date.now() > decoded.exp) {
            return res.status(401).json({ message: "Token has expired" });
        }
        const user = await User.findById(decoded.sub);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        } req.user = user;
        next()

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
}

module.exports = requireAuth;