const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const { connectDB } = require("./Config/db");
const userRoutes = require("./Routes/user.routes");
const chatRoutes = require("./Routes/chat.routes");
const messageRoutes = require("./Routes/message.routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const initializeSocket = require("./Socket");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Deployment setup
app.get("/", (req, res) => {
  res.send("API is running..");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

initializeSocket(server); 
