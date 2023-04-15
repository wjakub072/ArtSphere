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
    onChange(val);
  };

  return (
    <div className="relative">
      <label
        htmlFor="title"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Tytuł
      </label>
      <div className="mt-2 relative rounded-md shadow-sm">
        <input
          id="title"
          name="title"
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
