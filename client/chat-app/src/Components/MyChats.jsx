import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/solid"; // Import Heroicons for icons
import ChatLoading from "../Components/ChatLoading";
import { getSender } from "../Config/ChatLogics";
import GroupChatModal from "./misc/GroupChatModal";
import { BaseUrl } from "../Config/Constant";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`${BaseUrl}/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.error("Failed to load the chats", error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className={`flex flex-col items-center p-3 bg-white w-full md:w-1/3 rounded-lg border border-gray-200 ${
        selectedChat ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="flex justify-between items-center w-full pb-3 px-3 text-2xl font-sans">
        My Chats
        <GroupChatModal>
          <button className="flex items-center text-sm md:text-base lg:text-lg bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            New Group Chat
            <PlusIcon className="w-4 h-4 ml-2" />
          </button>
        </GroupChatModal>
      </div>
      <div className="flex flex-col p-3 bg-gray-100 w-full h-full rounded-lg overflow-y-hidden">
        {chats ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer px-3 py-2 rounded-lg mb-2 ${
                  selectedChat === chat
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
                {chat.latestMessage && (
                  <p className="text-xs">
                    <strong>{chat.latestMessage.sender.name}:</strong>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
