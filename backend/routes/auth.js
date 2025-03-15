const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");
const { createUser } = require("../controllers/users");

router.post("/login", login);
router.post("/signup", createUser);

module.exports = router;
