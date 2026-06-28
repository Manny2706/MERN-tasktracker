const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Tracker API Running",
  });
});

// Export app for Vercel
module.exports = app;