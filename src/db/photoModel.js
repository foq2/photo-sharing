const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectId,
});

const photoSchema = new mongoose.Schema({
  file_name: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectId,
  comments: [commentSchema],
});

const Photo = mongoose.model.Photos || mongoose.model("Photos", photoSchema);
const Comment =
  mongoose.model.Comments || mongoose.model("Comments", commentSchema);
module.exports = { Photo, Comment };
