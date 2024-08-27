import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../Config/ChatLogics";
import UpdateGroupChatModal from "./Model/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../Animations/typing.json";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/solid"; // Heroicons for icons
import { BaseUrl } from "../Config/Constant";

const ENDPOINT = BaseUrl || "http://localhost:8080";

let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    notifications,
    setNotifications,
  } = ChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${BaseUrl}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to Load the Messages", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to send the Message", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex w-full flex-col h-full">
          <div className="flex justify-between items-center px-2 py-3 text-2xl font-sans">
            <button
              onClick={() => setSelectedChat("")}
              className="block md:hidden"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <span className="text-xl w-full text-center">
              {!selectedChat.isGroupChat
                ? getSender(user, selectedChat.users)
                : selectedChat.chatName.toUpperCase()}
            </span>
            {selectedChat.isGroupChat && (
              <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
              />
            )}
          </div>

          <div className="flex flex-col justify-end p-3 bg-gray-200 w-full h-full rounded-lg overflow-y-hidden">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="messages overflow-y-scroll">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <div className="mt-3 flex items-center">
              {istyping && (
                <div className="mb-3">
                  <Lottie options={defaultOptions} width={70} />
                </div>
              )}
              <input
                type="text"
                placeholder="Enter a message.."
                className="w-full p-2 bg-gray-300 rounded-lg"
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600"
              >
                <PaperAirplaneIcon className="h-6 w-6 text-white rotate-90" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-3xl font-sans">Click on a user to start chatting</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
