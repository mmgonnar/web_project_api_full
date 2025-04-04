const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const errorHandler = require("../middleware/errorHandler");

const { JWT_SECRET = "secret-token" } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("");
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("");
      error.status = 404;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const error = new Error("");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({ token });
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

module.exports = {
  login,
};
