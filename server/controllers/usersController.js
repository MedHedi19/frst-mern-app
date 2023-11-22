const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const dotenv = require('dotenv');
dotenv.config();




async function Signup(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await User.create({ email, password: hashedPassword });
        res.status(200).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}


async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);
        res.cookie("Authorization", token, {
            expire: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production",
        })
        return res.status(200).json({ message: 'User logged in successfully ✔', data: user });
    } catch {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
}
function Logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.status(200).json("logued out")
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}
function checkAuth(req, res) {
    try {
        console.log(req.user);
        res.status(200).json({ message: "Authenticated" });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
}
module.exports = {
    Signup,
    Login,
    Logout,
    checkAuth
};