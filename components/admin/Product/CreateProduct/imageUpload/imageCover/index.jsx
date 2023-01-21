/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
const MAX_SIZE = 0.1 * 1024 * 1024;
const ImageCover = ({ imageCover, setImageCover }) => {
  const [error, setError] = useState("");
  const handleImageCover = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage.size < MAX_SIZE) {
      const image = new FileReader();
      image.readAsDataURL(selectImage);

      image.addEventListener("load", () => {
        setImageCover(image.result);
      });
      setError("");
    } else {
      setError("Image Size should be less than 100KB!");
    }
  };
  return (
    <div>
      {!imageCover ? (
        <>
          <label
            htmlFor="imageCover"
            className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          >
            <FiPlus /> Add Image Cover
          </label>
          <input
            type="file"
            name="imageCover"
            id="imageCover"
            onChange={handleImageCover}
            hidden
            accept="image/png,image/jpeg,image/webp"
            multiple={false}
          />
          {error && <span className="secondary text-sm">{error}</span>}
        </>
      ) : (
        <div className="max-w-xs flex flex-col gap-2">
          <img src={imageCover} alt="imageCover" className="object-contain" />
          <button
            onClick={() => setImageCover("")}
            className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCover;
