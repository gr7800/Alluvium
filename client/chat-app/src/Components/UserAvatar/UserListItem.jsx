import React from 'react';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex items-center w-full px-3 py-2 mb-2 text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-teal-500 hover:text-white"
    >
      <img
        className="w-8 h-8 mr-2 rounded-full cursor-pointer"
        src={user.pic}
        alt={user.name}
      />
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
