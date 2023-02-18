import React, { useState, useRef } from "react";

function ChatInput(props) {
  const { agents, selectedAgent, onSelectAgent, onSendMessage } = props;
  const [text, setText] = useState("");
  const [suggestedAgents, setSuggestedAgents] = useState([]);
  const inputRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAgentChange = (event) => {
    const agent = event.target.value;
    onSelectAgent(agent);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      onSendMessage(text);
      setText("");
    } else if (event.key === "@") {
      const query = text.substring(text.lastIndexOf("@") + 1);
      const matches = agents.filter((agent) =>
        agent.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestedAgents(matches);
    }
  };

  const handleSendMessage = () => {
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div className="p-8 border-t bg-gray-100 border-gray-300 flex items-center">
      {suggestedAgents.length > 0 && (
        <div className="absolute bottom-20 left-48 z-10 rounded-md bg-white outline-none ring-2 ring-blue-50 border-blue-50 focus:ring-blue-500">
          {suggestedAgents.map((agent) => (
            <div
              key={agent}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                const newText = text.replace(
                  "@" + text.substring(text.lastIndexOf("@") + 1),
                  "@" + agent + " "
                );
                setText(newText);
                setSuggestedAgents([]);
                inputRef.current.focus();
              }}
            >
              @{agent}
            </div>
          ))}
        </div>
      )}
      <select
        value={selectedAgent}
        onChange={handleAgentChange}
        className="rounded-md border-gray-300 text-sm px-2 py-1 outline-none ring-2 ring-blue-50 border-blue-50 focus:ring-blue-500 focus:border-blue-500"
      >
        {agents.map((agent) => (
          <option key={agent} value={agent}>
            {agent}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="flex-1 ml-4 rounded-md border-gray-300 text-sm px-3 py-2 outline-none ring-2 ring-blue-50 border-blue-50 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
