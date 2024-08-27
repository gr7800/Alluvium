import React from "react";

const UserProfileModal = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Information</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <img
            src={user.pic}
            alt={user.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
