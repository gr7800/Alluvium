const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../Controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

// Route to access or create a one-to-one chat
router.post("/", protect, accessChat);

// Route to fetch all chats for the logged-in user
router.get("/", protect, fetchChats);

// Route to create a new group chat
router.post("/group", protect, createGroupChat);

// Route to rename an existing group chat
router.put("/rename", protect, renameGroup);

// Route to add a user to a group chat
router.put("/groupadd", protect, addToGroup);

// Route to remove a user from a group chat
router.put("/groupremove", protect, removeFromGroup);

module.exports = router;
