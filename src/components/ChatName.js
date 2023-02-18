import React, { useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useStickyState } from "../hooks/useStickyState";

function ChatName() {
  const [name, setName] = useStickyState(generateRandomName(), "playgroundName");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
    inputRef.current.focus();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    inputRef.current.blur();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  return (
    <div className="bg-white border-b shadow border-gray-300 p-8 font-bold">
      <form
        className="playground-name flex items-center justify-between"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Enter playground name"
          value={name}
          onChange={handleNameChange}
          onClick={handleEditClick}
          onBlur={handleInputBlur}
          ref={inputRef}
          className="py-1 px-2 rounded-lg border-gray-300 outline-none ring-2 ring-blue-50 border-blue-50 focus:ring-blue-500 focus:border-blue-500 flex-grow mr-4"
        />
        {
          editing ?
            <button
              type="submit"
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
            >
              Save
            </button>
          :
            <FaPencilAlt
              size={16}
              color="#718096"
              className="cursor-pointer"
              onClick={() => {
                setEditing(true);
                inputRef.current.focus();
              }}
            />
        }
      </form>
    </div>
  );
}

// subset of adjectives & animals from https://gist.github.com/tkon99/4c98af713acc73bed74c
function generateRandomName() {
  const adjectives = [
    "abandoned",
    "able",
    "absolute",
    "adorable",
    "adventurous",
    "academic",
    "acceptable",
    "acclaimed",
    "accomplished",
    "accurate",
  ];
  const animals = [
    "dolphin",
    "unicorn",
    "tiger",
    "kangaroo",
    "dragon",
    "penguin",
    "fixie",
    "octopus",
    "giraffe",
    "agent",
    "whale",
  ];
  const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
  const nounIndex = Math.floor(Math.random() * animals.length);
  return `${adjectives[adjectiveIndex]}-${animals[nounIndex]}`;
}

export default ChatName;
