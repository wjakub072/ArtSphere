import React, { useState } from "react";
import classNames from "classnames";

function ArtistInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    return event.target.value;
  };

  return (
    <div className="relative">
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Artysta
      </label>
      <div className="mt-2 relative rounded-md shadow-sm">
        <input
          id="search"
          name="search"
          type="text"
          className={classNames(
            "form-input rounded-md block w-full py-2 pl-4 pr-3 sm:text-sm sm:leading-5",
            {
              "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500":
                !focused,
              "border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500":
                focused,
            }
          )}
          placeholder="Imie 'Pseudonim' Nazwisko"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default ArtistInput;
