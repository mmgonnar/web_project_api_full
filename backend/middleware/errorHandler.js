module.exports = (err, req, res, next) => {
  console.log("Error details:", {
    message: err.message,
    stack: err.stack,
    status: err.status,
    type: req.type,
  });

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

  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({
      status: "error",
      message: "CORS error: Origin not allowed",
    });
  }

  res.status(statusCode).json({ status: "error", message: message });
};
