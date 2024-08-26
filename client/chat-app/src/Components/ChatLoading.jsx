import React from 'react';

const ChatLoading = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-11 bg-gray-300 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ChatLoading;
