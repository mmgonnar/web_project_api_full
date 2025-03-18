const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth.js");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
//router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/avatar", updateAvatar);
router.get("/users/me", getUserById);

module.exports = router;
