const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { connectDB } = require("./Config/db");
const userRoutes = require("./Routes/user.routes");
const chatRoutes = require("./Routes/chat.routes");
const messageRoutes = require("./Routes/message.routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON data
app.use(cors()); // Enable CORS

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

// Socket.io setup
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://alluviumguddu.netlify.app",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id !== newMessageReceived.sender._id) {
        socket.in(user._id).emit("message received", newMessageReceived);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

module.exports = app;
