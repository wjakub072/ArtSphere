import React, { useState } from "react";

const TagInput = ({ prevTags, actualTags }) => {
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState(prevTags);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTag = () => {
    actualTags([...new Set([...tags, inputText])]);
    setTags([...new Set([...tags, inputText])]);
    setInputText("");
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    actualTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mt-8">
        <div className="flex items-center border-b-2 border-indigo-600 py-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Wyszukaj tag"
          />
          <button
            onClick={handleAddTag}
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-800 border-2 rounded-md border-transparent focus:outline-none focus:bg-indigo-800 focus:border-indigo-400 text-sm text-white py-1 px-2 transition-colors"
          >
            Dodaj
          </button>
        </div>
        <div className="flex flex-wrap mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mt-2 relative flex items-center"
            >
              <span className="mr-2">{tag}</span>
              <button
                className="text-white hover:text-red-600 border-2 rounded-md border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                onClick={() => handleDeleteTag(tag)}
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
