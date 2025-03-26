const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require("joi");

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
    default: "An awesome explorer!",
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

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const userValidationSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30).default("Jacques Cousteau"),
  about: Joi.string().min(2).max(30).default("An awesome explorer!"),
  avatar: Joi.string()
    .custom(validateURL)
    .default(
      "https://i.pinimg.com/736x/b5/49/41/b5494197b2d462c940f88988b203d290.jpg"
    ),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

//Joi.string().required().custom(validateUrl);

module.exports = mongoose.model("user", userSchema);

module.exports.userValidationSchema = userValidationSchema;
