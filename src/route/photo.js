const express = require("express");
const router = express.Router();
const { Photo } = require("../db/photoModel");
const User = require("../db/userModel");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");

//photo list
router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        status: 400,
        message: "User not found!",
      });
      return;
    }
    const photosList = await Photo.find({ user_id: userId })
      .sort({ date_time: -1 })
      .lean();

    for (const i in photosList) {
      for (const j in photosList[i].comments) {
        const user = await User.findById(photosList[i].comments[j]["user_id"]);
        photosList[i].comments[j].user = user;
      }
    }
    console.log("PhotoList:", photosList);
    res.status(200).json({
      status: 200,
      message: "Success!",
      photosList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      message: "Internal service error!",
    });
  }
});

//upload photo
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      console.log(file);
      const photoEntity = new Photo({
        file_name: file.filename,
        user_id: req.body.user_id,
        comments: [],
      });
      await photoEntity.save();
      res.status(200).json({
        status: 200,
        message: "Success!",
        photo: photoEntity,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: 500,
        message: "Internal service error!",
      });
    }
  }
);

module.exports = router;
