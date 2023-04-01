import { useState } from 'react';
import classNames from 'classnames';

//import { SearchIcon as MagnifyingGlassIcon , UserIcon } from '@heroicons/react/solid';

function ArtistSearchBox({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search artists
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         
        </div>
        <input
          id="search"
          name="search"
          type="text"
          className={classNames(
            'form-input block w-full py-2 pl-10 pr-3 sm:text-sm sm:leading-5',
            {
              'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500': !focused,
              'border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500': focused,
            }
          )}
          placeholder="Search artists"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          
        </div>
      </div>
    </div>
  );
}

export default ArtistSearchBox;
