const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET = "secret-token" } = process.env;

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, "email");

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      console.log(user, "user");
      if (!user) {
        return res
          .status(401)
          .send({ message: "Wrong credentials! Please try again." });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        console.log("AA");
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Wrong credentials! Please try again." });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        console.log(token, "token");
        console.log(JWT_SECRET, "jwt-secret");
        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  login,
};
