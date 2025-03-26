module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;

  const reqType = req.type == "user" ? "user" : "card";
  const errorMessages = {
    user: {
      400: "Missing fields. Please fill all fields.",
      401: "Wrong credentials! Please try again.",
      404: "Account not found. Please register or check your email.",
      500: "Service temporarily unavailable. Try later.",
    },
    card: {
      400: "Missing fields. Please fill all fields.",
      401: "Wrong credentials! Please try again.",
      404: "Card not found. Please register or check your email.",
      500: "Service temporarily unavailable. Try later.",
    },
  };
  const message = errorMessages[reqType][statusCode] || "Unknown error.";
  console.log(errorMessages[reqType][statusCode], "errHandler");

  res.status(statusCode).json({ status: "error", message: message });
};
