const mongoose = require("mongoose");

module.exports =
  mongoose.model.Users ||
  mongoose.model(
    "Users",
    new mongoose.Schema({
      first_name: { type: String },
      last_name: { type: String },
      location: { type: String },
      description: { type: String },
      occupation: { type: String },
      username: { type: String, unique: true, require: true },
      password: { type: String, unique: true, require: true },
    })
  );
