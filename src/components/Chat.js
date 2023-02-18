import React, { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatName from "./ChatName";
import { useStickyState } from "../hooks/useStickyState";

function Chat() {
  const [agents] = useState([
    "user",
    "stablediffusion",
    "midjourney",
    "calendar",
    "stonks",
    "github",
  ]);
  const [selectedAgent, setSelectedAgent] = useState("user");
  const [messages, setMessages] = useStickyState([], "chatMessages");

  const addMessage = (text) => {
    const timestamp = new Date().getTime();
    const message = {
      from: selectedAgent,
      text: text,
      timestamp: timestamp,
    };
    setMessages([...messages, message]);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <ChatName />
      <ChatMessages messages={messages} />
      <ChatInput
        agents={agents}
        selectedAgent={selectedAgent}
        onSelectAgent={(agent) => setSelectedAgent(agent)}
        onSendMessage={addMessage}
      />
    </div>
  );
}

export default Chat;
