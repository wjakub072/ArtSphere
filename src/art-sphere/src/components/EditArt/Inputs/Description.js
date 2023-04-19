import { useState } from "react";

function Description({ title, subtitle, value, onChange }) {
  const [description, setDescription] = useState(value);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    onChange(event.target.value);
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-3 bg-white rounded-lg shadow-md">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      {subtitle && <h3 className="text-md font-medium mb-4">{subtitle}</h3>}
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
}

export default Description;
