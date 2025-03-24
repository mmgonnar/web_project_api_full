const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth.js");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
//router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/avatar", updateAvatar);
router.get("/users/me", getUserById);
router.delete("/users/me", deleteUser);

//ejemplo
// router.post(
//   "/users/me",
//   celebrate({
//     body: Joi.object().keys({
//       title: Joi.string().required().min(2).max(30),
//       text: Joi.string().required().min(2),
//       password: Joi.string()
//         .required()
//         .min(2)
//         .max(30)
//         .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
//     }),
//   }),
//   deleteUser
// );

module.exports = router;
