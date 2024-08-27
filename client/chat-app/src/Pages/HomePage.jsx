import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import Navbar from "../Components/Navbar/Navbar";

const HomePage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }} className="bg-[#595959]">
      {user && <Navbar />}
      <div
        className="flex justify-between w-full h-[89vh] p-3 gap-3"
      >
        {user && (
          <MyChats fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
