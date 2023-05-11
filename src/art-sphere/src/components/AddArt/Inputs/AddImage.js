import { useState } from "react";

function AddImage({ value, onChange }) {
  const [selectedImage, setSelectedImage] = useState(value);

  const imgToBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  function handleImageChange(event) {
    if (event.target.files[0]) {
      imgToBase64(event.target.files[0], (result) => {
        setSelectedImage(result);
        onChange(result);
      });
    } else {
      setSelectedImage("");
      onChange("");
    }
    // setSelectedImage(event.target.files[0]);
    // onChange(event.target.files[0]);
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
      {selectedImage ? (
        <img
          // src={URL.createObjectURL(selectedImage)}
          src={selectedImage}
          alt="Selected"
          className="w-full h-64 object-contain rounded-md mb-4"
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
