const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.get("/", protect, allUsers);
router.post("/login", authUser);

module.exports = router;
