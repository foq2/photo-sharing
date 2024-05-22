const mongoose = require("mongoose");

const commectSchema = new mongoose.Schema({
  text: { type: String },
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectIed,
});
