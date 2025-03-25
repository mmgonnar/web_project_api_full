module.exports = (err, req, res, next) => {
  console.log("ddddddd");
  const statusCode = err.status || 500;
  //let message = err.message;
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
      404: "Account not found. Please register or check your email.",
      500: "Service temporarily unavailable. Try later.",
    },
  };

  console.log(errorMessages[reqType][statusCode], "errHandler.js 22");
  const message = errorMessages[reqType][statusCode] || "Unknown error.";

  res.status(statusCode).json({ status: "error", message: message });
};
