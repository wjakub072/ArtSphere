import React from "react";
import { PlusIcon } from "@heroicons/react/outline";

function EditArtButton({ title, onClick }) {
  return (
    <button
      className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
      {title}
    </button>
  );
}

export default EditArtButton;
