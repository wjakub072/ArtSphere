import React, { useState } from "react";
import classNames from "classnames";

function PriceInput({ title, value, onChange, label = title }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(value);

  const handleFocus = (e) => {
    e.target.select();
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
    <div className="relative">
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-indigo-600"
      >
        {title}
      </label>
      <div className="mt-2 relative rounded-xl shadow-sm">
        <input
          id={label}
          name={label}
          type="number"
          className={classNames(
            "form-input border-2 rounded-xl border-transparent focus:outline-none focus:border-indigo-600 block w-full py-2 pl-4 pr-10 sm:text-sm sm:leading-5",
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
        <span className="absolute inset-y-0 right-0 mr-14 flex items-center text-gray-500 sm:text-sm  pointer-events-none">
          PLN
        </span>
      </div>
    </div>
  );
}

export default PriceInput;
