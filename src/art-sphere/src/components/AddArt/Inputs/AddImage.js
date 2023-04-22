import { useState } from "react";

<<<<<<< HEAD
function AddImage({ value, onChange }) {
  const [selectedImage, setSelectedImage] = useState(value);

  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
    onChange(event.target.files[0]);
=======
function AddImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
      {selectedImage ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-md mb-4"></div>
      )}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />
    </div>
  );
}

export default AddImage;
