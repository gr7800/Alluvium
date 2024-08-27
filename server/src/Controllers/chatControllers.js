const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

// Access or create a one-to-one chat
exports.accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "UserId parameter not sent with request" });
  }

  try {
    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (chat.length > 0) {
      return res.status(200).json(chat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-password");

      return res.status(200).json(fullChat);
    }
  } catch (error) {
    console.error("Error accessing chat:", error);
    return res.status(500).send({ message: "Failed to access chat" });
  }
};

// Fetch all chats for the logged-in user
exports.fetchChats = async (req, res) => {
  try {
    let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).send({ message: "Failed to fetch chats" });
  }
};

// Create a new group chat
exports.createGroupChat = async (req, res) => {
  const { users: usersJson, name } = req.body;

  if (!usersJson || !name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  let users;
  try {
    users = JSON.parse(usersJson);
  } catch (error) {
    return res.status(400).send({ message: "Invalid users data" });
  }

  if (users.length < 2) {
    return res.status(400).send({ message: "More than 2 users are required to form a group chat" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    return res.status(500).send({ message: "Failed to create group chat" });
  }
};

// Rename an existing group chat
exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).send({ message: "Chat not found" });
    }

    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error("Error renaming group:", error);
    return res.status(500).send({ message: "Failed to rename group" });
  }
};

// Add a user to a group chat
exports.addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).send({ message: "Chat not found" });
    }

    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error("Error adding user to group:", error);
    return res.status(500).send({ message: "Failed to add user to group" });
  }
};

// Remove a user from a group chat
exports.removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).send({ message: "Chat not found" });
    }

    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error("Error removing user from group:", error);
    return res.status(500).send({ message: "Failed to remove user from group" });
  }
};
