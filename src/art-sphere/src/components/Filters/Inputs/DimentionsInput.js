import React, { useState } from 'react'
import classNames from 'classnames';

function DimensionInput({ title, value, onChange }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= 0) {
      onChange(newValue);
    } else {
      onChange(0);
    }
  };

  return (
    <div className="relative">
      <label htmlFor="dimension" className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id="dimension"
          name="dimension"
          type="number"
          className={classNames(
            'form-input block w-full py-2 px-4 pr-12 sm:text-sm sm:leading-5',
            {
              'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500': !focused,
              'border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500': focused,
            }
          )}
          placeholder="0.00"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 sm:text-sm" style={{ marginRight: "3rem" }}>
          cm
        </span>
      </div>
    </div>
  );
}

export default DimensionInput;