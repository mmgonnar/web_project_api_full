const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const errorHandler = require("../middleware/errorHandler");

const { JWT_SECRET = "secret-token" } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, "email");

  if (!email || !password) {
    return next({ status: 400 });
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next({ status: 404 });
        // const error = new Error("User not found");
        // error.status = 404;
        // throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          //throw new Error(res.status);
          return next({ status: 401 });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  login,
};
