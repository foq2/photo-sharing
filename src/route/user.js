const express = require("express");
const router = express.Router();
const User = require("../db/userModel");
const verifyToken = require("../middleware/auth");
const bcrypt = require("bcrypt");

//user list
router.get("/", verifyToken, async (req, res) => {
  const userList = await User.find({}).select([
    "_id",
    "first_name",
    "last_name",
  ]);
  console.log(userList);
  res.status(200).json({
    status: 200,
    message: "Success!",
    userList,
  });
});
//found user
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user_id = req.params.id;
    const userFound = await User.findById(user_id);
    console.log(userFound);
    if (!userFound) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Success!",
        user: userFound,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      message: "Internal service error!",
    });
  }
});

//user registration
router.post("/register", async (req, res) => {
  try {
    const userForRegistration = req.body;
    const userEntity = await User.find({
      username: userForRegistration.username,
    });
    if (userEntity.length > 0) {
      res.status(400).json({
        status: 400,
        message: "Username already existed!",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(userForRegistration.password, 10);
    const user = new User({
      first_name: userForRegistration.first_name,
      last_name: userForRegistration.last_name,
      location: userForRegistration.location,
      description: userForRegistration.description,
      occupation: userForRegistration.occupation,
      username: userForRegistration.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      status: 200,
      message: "Registration successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      message: "Internal service error!",
    });
  }
});

module.exports = router;
