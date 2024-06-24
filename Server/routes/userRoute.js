const express = require("express");
const router = express.Router();

const {signUp, login, logout, myProfile} = require("../controllers/User");
const { auth } = require("../middlewares/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/user/me", auth, myProfile);

module.exports = router;