const express = require("express");
const usersController = require("../controllers/usersController.js");
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
const requireAuth = require('../middleware/requireAuth.js');


app.use(cookieParser());
app.use(express.json());
router.post("/signup", usersController.Signup);
router.post("/login", usersController.Login);
router.get("/logout", usersController.Logout);
router.get("/check-auth", requireAuth, usersController.checkAuth);



module.exports = router;

