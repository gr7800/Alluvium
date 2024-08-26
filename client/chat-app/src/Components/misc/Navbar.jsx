import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../Config/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import logo from "../../images/logo.jpg"
import { BaseUrl } from "../../Config/Constant";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${BaseUrl}/api/user?search=${search}`, config);

      // console.log(data)

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load the search results");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${BaseUrl}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error("Error fetching the chat");
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full p-4 border-b-4">
        <div className="flex items-center">
          <button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => setIsDrawerOpen(true)}
          >
            <i className="fas fa-search"></i>
            <span className="ml-2 hidden md:inline">Search User</span>
          </button>
        </div>
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto pb-2" width="150px" />
        </div>
        <div className="flex items-center relative">
          <div
            className="relative"
            onMouseEnter={() => setIsNotificationsOpen(true)}
            onMouseLeave={() => setIsNotificationsOpen(false)}
          >
            <NotificationBadge
              count={notifications.length}
              effect={Effect.SCALE}
            />
            <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
                {notifications.length === 0 ? (
                  <div className="p-2 text-gray-700">No new messages</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedChat(notification.chat);
                        setNotifications(
                          notifications.filter((n) => n !== notification)
                        );
                        setIsNotificationsOpen(false);
                      }}
                    >
                      {notification.chat.isGroupChat
                        ? `New message in ${notification.chat.chatName}`
                        : `New message from ${getSender(
                          user,
                          notification.chat.users
                        )}`}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div
            className="ml-4 relative"
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <button className="flex items-center bg-white text-gray-600 hover:text-gray-900">
              <img
                className="w-8 h-8 rounded-full"
                src={user.pic}
                alt={user.name}
              />
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md z-10">
                <button className="w-full text-left p-2 hover:bg-gray-100">
                  My Profile
                </button>
                <div className="border-t"></div>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="relative bg-white w-80 shadow-lg z-50">
            <div className="border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Search Users</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-md mr-2"
                  placeholder="eg Guddu, Suddu, Saurbha"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Go
                </button>
              </div>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.length>0 && searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && (
                <div className="flex justify-center mt-4">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
