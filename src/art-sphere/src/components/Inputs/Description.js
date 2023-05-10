import { useState } from "react";

function Description({ title, subtitle, value, onChange }) {
  const [description, setDescription] = useState(value);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    onChange(event.target.value);
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-3 bg-white rounded-lg shadow-md">
      {title && (
        <h2 className="text-xl font-bold text-indigo-600 mb-2">{title}</h2>
      )}
      {subtitle && (
        <h3 className="text-md font-medium text-indigo-600 mb-4">{subtitle}</h3>
      )}
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        rows={7}
        className="w-full border-2 rounded-md focus:outline-none focus:border-indigo-600 border-gray-300 p-2"
      />
    </div>
  );
}

export default Description;
