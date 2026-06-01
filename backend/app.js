require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;
const corsSettings = require("./middleware/cors");

const mongoose = require("mongoose");

const DATABASE_URL =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/aroundb";

mongoose
  .connect(DATABASE_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log("Server connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });

//CORS
app.use(cors(corsSettings));
app.options("*", cors(corsSettings));

//Middleware to parse JSON
app.use(express.json());

app.use(requestLogger);

//root
app.get("/", (req, res) => {
  res.sendStatus(200);
});

//keep-alive for MongoDB Atlas free tier
app.get("/keep-alive", async (req, res) => {
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(503).json({ status: "error", message: err.message });
  }
});

//auth routes
app.use("/", authRoutes);
app.use(auth);
app.use("/", userRoutes); //users
app.use("/", cardRoutes); // cards

// not existing routes
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
//start server
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});

module.exports = app;
