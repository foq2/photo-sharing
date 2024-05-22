const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectIed,
});

const photoSchema = new mongoose.Schema({
  file_name: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectId,
  conmments: [commentSchema],
});

const Photo =
  mongoose.model.Photos || mongoose.model.model("Photos", photoSchema);
const Comment =
  mongoose.model.Comments || mongoose.model.model("Comments", commentSchema);
module.exports = { Photo, Comment };
