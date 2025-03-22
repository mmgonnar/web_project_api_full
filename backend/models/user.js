const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Junior Web Developer",
  },
  avatar: {
    type: String,
    validate: {
      validator: (str) => {
        return validator.isURL(str);
      },
      message: "Invalid url",
    },
    default:
      "https://i.pinimg.com/736x/b5/49/41/b5494197b2d462c940f88988b203d290.jpg",
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
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
