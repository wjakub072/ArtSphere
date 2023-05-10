import { useState } from "react";
import classNames from "classnames";

function TitleInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(value);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    setVal(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <label
        htmlFor="title"
        className="block text-sm font-medium leading-6 text-indigo-600"
      >
        Tytuł
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id="title"
          name="title"
          type="text"
          className={classNames(
            "form-input rounded-md block w-full py-2 pl-4 pr-3 sm:text-sm sm:leading-5 border-2 border-transparent focus:outline-none focus:border-indigo-600",
            {
              "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500":
                !focused,
              "border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500":
                focused,
            }
          )}
          placeholder="Tytuł"
          value={val}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default TitleInput;
