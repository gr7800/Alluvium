import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../Config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div className="tooltip-bottom-start" data-tooltip={m.sender.name}>
                <img
                  className="w-8 h-8 mt-[7px] mr-1 rounded-full cursor-pointer"
                  src={m.sender.pic}
                  alt={m.sender.name}
                  title={m.sender.name}
                />
              </div>
            )}
            <span
              className={`${
                m.sender._id === user._id ? 'bg-blue-200' : 'bg-green-200'
              } 
                ${isSameSenderMargin(messages, m, i, user._id)} 
                ${isSameUser(messages, m, i, user._id) ? 'mt-[3px]' : 'mt-[10px]'}
                rounded-2xl px-4 py-2 max-w-[75%]`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
