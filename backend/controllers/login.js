const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const errorHandler = require("../middleware/errorHandler");

const { JWT_SECRET = "secret-token" } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new Error("");
    error.status = 400;
    throw error;
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        let error = new Error("");
        error.status = 404;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          let error = new Error("");
          error.status = 401;
          throw error;
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      req.type = "user";
      next(err);
    });
};

module.exports = {
  login,
};
