import React, {  useState } from 'react'
import classNames from 'classnames';    

function PriceInput({ title, value, onChange }) {
    const [focused, setFocused] = useState(false)
  
    const handleFocus = () => {
      setFocused(true)
    }
  
    const handleBlur = () => {
      setFocused(false)
    }
  
    const handleChange = (event) => {
      const newValue = parseInt(event.target.value)
      if(newValue >= 0){
        value = newValue;
        onChange(value);
      }else {
        event.target.value = 0;
      }
    }

    return (
      <div className="PriceInput relative">
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="price"
            name="price"
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
        </div>
      </div>
    )
  }
  
  export default PriceInput