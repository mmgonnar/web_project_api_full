require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "secret-token" } = process.env;

module.exports = (req, res, next) => {
  // Skip auth check for OPTIONS requests (CORS preflight)
  if (req.method === "OPTIONS") {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Need Authorization" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).send({ message: "Invalid token" });
  }
};
