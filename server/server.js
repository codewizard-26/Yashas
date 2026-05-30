require("dotenv").config();

const express = require("express");
const cors = require("cors");

const corsOptions = require("./config/cors");
const { connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer()