import React, { useState } from "react";
import classNames from "classnames";

function PriceInput({ title, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(value);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (newValue >= 0) {
      value = newValue;
      setVal(newValue);
      onChange(value);
    } else {
      onChange(0);
      setVal(0);
    }
  };

  return (
    <div className="PriceInput relative">
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2 relative rounded-md shadow-sm">
        <input
          id="price"
          name="price"
          type="number"
          className={classNames(
            "form-input rounded-md block w-full py-2 pl-4 sm:text-sm sm:leading-5",
            {
              "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500":
                !focused,
              "border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500":
                focused,
            }
          )}
          placeholder="0.00"
          value={val}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="absolute inset-y-0 right-0 mr-14 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">PLN</span>
        </div>
      </div>
    </div>
  );
}

export default PriceInput;
