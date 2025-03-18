const jwt = require("jsonwebtoken");
const { JWT_SECRET = "secret-token" } = process.env;

module.export = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
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
