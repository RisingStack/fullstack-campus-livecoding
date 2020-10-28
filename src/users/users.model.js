const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: null,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
