const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");
const { createUser } = require("../controllers/users");
console.log("auth");

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
