import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XIcon, EyeIcon } from "@heroicons/react/solid";
import { BaseUrl } from "../../Config/Constant";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("User already in group!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error("Only admins can add someone!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${BaseUrl}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("Error Occurred!", {
        description: error.response.data.message,
        position: "bottom-center",
        autoClose: 3000,
      });
      setLoading(false);
    }

    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error("Only admins can remove someone!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${BaseUrl}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error("Error Occurred!", {
        description: error.response.data.message,
        position: "bottom-center",
        autoClose: 3000,
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${BaseUrl}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("Error Occurred!", {
        description: error.response.data.message,
        position: "bottom-center",
        autoClose: 3000,
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${BaseUrl}/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to Load the Search Results", {
        position: "bottom-left",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={() => document.getElementById("group-chat-modal").showModal()}
        className="text-blue-500 p-2 rounded-full hover:bg-gray-200"
      >
        <EyeIcon className="h-6 w-6" />
      </button>

      <dialog
        id="group-chat-modal"
        className="p-0 w-full max-w-md rounded-lg border border-gray-300 shadow-lg"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold">{selectedChat.chatName}</h2>
          <button
            onClick={() => document.getElementById("group-chat-modal").close()}
            className="text-gray-500 hover:text-gray-800"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap mb-3">
            {selectedChat.users.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(user)}
              />
            ))}
          </div>
          <div className="flex mb-3">
            <input
              type="text"
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg flex-grow"
            />
            <button
              onClick={handleRename}
              disabled={renameLoading}
              className="ml-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              {renameLoading ? "Updating..." : "Update"}
            </button>
          </div>
          <input
            type="text"
            placeholder="Add User to group"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-3"
          />
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </div>
        <div className="flex justify-end p-4 border-t border-gray-300">
          <button
            onClick={() => handleRemove(user)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Leave Group
          </button>
        </div>
      </dialog>
    </>
  );
};

export default UpdateGroupChatModal;
