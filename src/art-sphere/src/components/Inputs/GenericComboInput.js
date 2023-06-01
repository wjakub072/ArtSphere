import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ArrowSmDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export default function GenericComboImput({
  title,
  list,
  onChange,
  value = list[0].name,
}) {
  const handleChange = (event) => {
    onChange(event);
  };
  return (
    <div className="">
      <Listbox
        value={list.filter((item) => item.name === value)[0]}
        onChange={handleChange}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-indigo-600">
              {title}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border-2 rounded-xl border-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {list.filter((item) => item.name === value)[0].name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ArrowSmDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg border-2 rounded-lg border-transparent focus:outline-none focus:border-indigo-600 sm:text-sm">
                  {list.map((element) => (
                    <Listbox.Option
                      key={element.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={element}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {element.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
