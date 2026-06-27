require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const {
    publicRouter,
    privateRouter,
} = require("./routeMap");

const corsOptions = require("./config/cors");
const { connectDB } = require("./config/db");
const { initializeSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // replace with frontend URL in production
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", publicRouter);
app.use("/api", privateRouter);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

// Initialize Socket
initializeSocket(io);

// Make io available globally
app.set("io", io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();