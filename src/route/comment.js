const express = require("express");
const { Photo, Comment } = require("../db/photoModel");
const router = express.Router();
const verifyToken = require("../middleware/auth");
// add comment
router.post("/photo/:id", verifyToken, async (req, res) => {
  try {
    const commentForCreation = req.body;
    const photoId = req.params.id;
    const photoEntity = await Photo.findById(photoId);
    console.log(photoEntity);
    console.log(commentForCreation);
    if (
      !commentForCreation.comment ||
      !commentForCreation.date_time ||
      !commentForCreation.user_id
    ) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
      });
      return;
    }

    const comment = new Comment({
      comment: commentForCreation.comment,
      date_time: commentForCreation.date_time,
      user_id: commentForCreation.user_id,
    });
    // console.log("123456789", photoEntity.comments);
    await comment.save();
    photoEntity.comments.push(comment);
    await photoEntity.save();

    res.status(200).json({
      status: 200,
      message: "Success",
      comment,
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
