//import login from "./controllers/login";
const { login, createUser } = require("./controllers/users");

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");

const DATABASE_URL = "mongodb://127.0.0.1:27017/aroundb";
// 4 cors
const settings = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH",
  AllowedHeaders: ["Content-Type", "Authorization"],
};

mongoose.connect(DATABASE_URL).then(() => {
  console.log("Server connected");
});

//Cors Middleware
app.use(cors());
//app.use(auth);
//Middleware to parse JSON
app.use(express.json());
//Middleware to get info
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()}, ${req.method}, ${req.url}`);
  next();
});
//

// app.use((err, req, res, next) => {
//   res
//     .status(500)
//     .send({ message: "Internal error or misconfiguration has occurred" });
//   next(new Error("Authorization error"));
// });

//root
app.get("/", (req, res) => {
  console.log("Received a request at the root endpoint.");
  res.sendStatus(200);
});

//auth routes
app.use("/", authRoutes);
app.use(auth);
app.use("/", userRoutes); //users
app.use("/", cardRoutes); // cards

// Ruta para probar errores 500
// app.get("/force-500", (req, res, next) => {
//   next(new Error("Error forzado para pruebas"));
// });

// not existing routes
app.use((req, res) => {
  console.log(res);
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);
//start server
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
