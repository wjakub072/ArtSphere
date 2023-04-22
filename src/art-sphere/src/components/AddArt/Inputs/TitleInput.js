import { useState } from "react";
import classNames from "classnames";

function TitleInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
<<<<<<< HEAD
  const [val, setVal] = useState(value);
=======
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
<<<<<<< HEAD
    setVal(event.target.value);
    onChange(val);
=======
    return event.target.value;
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
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
<<<<<<< HEAD
          value={val}
=======
          value={value}
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default TitleInput;
