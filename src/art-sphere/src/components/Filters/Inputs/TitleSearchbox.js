import { useState } from 'react';
import classNames from 'classnames';
import { SearchIcon } from '@heroicons/react/solid';

function TitleSearchbox({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="relative">
      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
        Search by Title
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="title"
          name="title"
          type="text"
          className={classNames(
            'form-input block w-full py-2 pl-10 pr-3 sm:text-sm sm:leading-5',
            {
              'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500': !focused,
              'border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500': focused,
            }
          )}
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default TitleSearchbox;
