const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (str) => {
        return validator.isURL(str);
      },
      message: "Invalid url",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return validator.isEmail(email);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
