const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth.js");
const { celebrate, Joi } = require("celebrate");
const {
  userValidationSchema,
  updateUserValidationSchema,
  userEmailValidationSchema,
} = require("../models/user");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require("../controllers/users");

router.get("/users/me", getUsers);
router.get("/users/:userId", getUserById);
//router.post("/users", createUser);
//router.patch("/users/me", updateUser);
router.patch("/users/avatar", updateAvatar);
router.get("/users/me", getUserById);
router.delete("/users/me", deleteUser);

router.patch(
  "/users/me",
  celebrate({
    body: updateUserValidationSchema,
  }),
  updateUser
);

module.exports = router;
