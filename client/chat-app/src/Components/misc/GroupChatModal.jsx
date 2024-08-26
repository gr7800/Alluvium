import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { toast } from "react-toastify";
import { BaseUrl } from "../../Config/Constant";

const GroupChatModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]); // Ensure this is initialized as an array
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${BaseUrl}/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!groupChatName || !selectedUsers.length) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BaseUrl}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsOpen(false);
      toast.success("New Group Chat Created!");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to Create the Chat!");
      setLoading(false);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (userToDel) => {
    setSelectedUsers(
      selectedUsers.filter((selected) => selected._id !== userToDel._id)
    );
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-blue-500">
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-2xl font-semibold">Create Group Chat</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Chat Name"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add Users eg: Guddu, Suddu, Saurbh"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-wrap mb-4">
                {selectedUsers.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleDelete(user)}
                  />
                ))}
              </div>

              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <div>
                  {searchResult.length>0 && searchResult?.slice(0, 4).map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
