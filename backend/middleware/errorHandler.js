module.exports = (err, req, res, next) => {
  console.log("Error occurred: ", err);
  const statusCode = err.status || 500;
  //let message = err.message;

  console.log("Error details:", {
    status: err.status,
    message: err.message,
  });

  const errorMessages = {
    400: "Missing fields. Please fill all fields.",
    401: "Wrong credentials! Please try again.",
    404: "Account not found. Please register or check your email.",
    500: "Service temporarily unavailable. Try later.",
  };

  const message = errorMessages[statusCode] || "Unknown error.";

  res.status(statusCode).json({ status: "error", message: message });

  // switch (statusCode) {
  //   case 400:
  //     message = "Bad request. Missing required fields";
  //     break;
  //   case 401:
  //     message = "Wrong credentials! Please try again.";
  //     break;
  //   case 403:
  //     message = "Access forbidden. You don't have permission.";
  //     break;
  //   case 404:
  //     message = "User not found. Please try again";
  //     break;
  //   default:
  //     statusCode = 500;
  //     message = "Internal error or misconfiguration has occurred";
  // }
  // if (statusCode === 401) {
  //   message = "Wrong credentials! Please try again.";
  //   //res.status(statusCode).json({ message: message });
  // } else if (statusCode === 404) {

  // }

  // if (statusCode === 404) {
  //   message = "User not found. Please try again";
  // }

  // if (statusCode === 500) {
  //   message = "Internal error";
  // }

  //next()
};
