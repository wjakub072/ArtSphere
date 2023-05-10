import React, { useState } from 'react';

const TagInput = () => {
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTag = () => {
    setTags([...tags, inputText]);
    setInputText('');
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mt-8">
        <div className="flex items-center border-b border-b-2 border-indigo-500 py-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Wyszukaj tag"
          />
          <button
            onClick={handleAddTag}
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Dodaj
          </button>
        </div>
        <div className="flex flex-wrap mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2 relative flex items-center"
            >
              <span className="mr-2">{tag}</span>
              <button
                className="text-gray-700 hover:text-red-700"
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
