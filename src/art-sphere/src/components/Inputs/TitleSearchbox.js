import { useState } from "react";
import classNames from "classnames";
import { SearchIcon } from "@heroicons/react/solid";

function TitleSearchbox(props) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="relative">
      <label
        htmlFor="title"
        className="block text-sm font-medium leading-6 text-indigo-600"
      >
        Wyszukaj tytuł
      </label>
      <div className="mt-2 relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="title"
          name="title"
          type="text"
          className={classNames(
            "form-input rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 block w-full py-2 pl-10 pr-3 sm:text-sm sm:leading-5",
            {
              "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500":
                !focused,
              "border-indigo-500 focus:border-indigo-500 focus:ring-indigo-500":
                focused,
            }
          )}
          placeholder="Szukaj"
          value={props.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default TitleSearchbox;
