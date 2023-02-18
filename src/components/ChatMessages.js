import React from "react";

function ChatMessages(props) {
  const { messages } = props;

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="flex mb-4 pt-2">
          <div className="w-14 h-14 rounded-full bg-gray-200 mr-4"></div>
          <div className="flex w-full flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="font-bold">@{message.from}</div>
              <div className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</div>
            </div>
            <div className="text-sm self-start">{message.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatTimestamp(timestamp) {
  const now = new Date().getTime();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  } else {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}

export default ChatMessages;
