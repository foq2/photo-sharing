require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username })?.lean();
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect Username!",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect Password!",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    delete user.password;
    res.status(200).json({
      status: 200,
      message: "Login success",
      token,
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal service error!" });
  }
});

module.exports = router;
