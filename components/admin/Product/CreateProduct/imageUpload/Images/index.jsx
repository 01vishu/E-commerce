/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
const MAX_SIZE = 0.1 * 1024 * 1024;

const Images = ({ images, setImages }) => {
  const [error, setError] = useState("");
  const handleImages = (e) => {
    const selectImage = e.target.files;
    const selectImagesArray = Array.from(selectImage);
    const imagesArray = selectImagesArray.map((image) => {
      if (image.size < MAX_SIZE) {
        const encodeImage = new FileReader();
        encodeImage.readAsDataURL(image);
        encodeImage.addEventListener("load", () => {
          setImages((prev) => prev.concat(encodeImage.result));
        });
      } else {
        return setError("Image size should be less than 100KB");
      }
    });
    setError("");
  };
  return (
    <>
      <div className="flex flex-col-reverse gap-4">
        <div>
          <label
            htmlFor="images"
            className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          >
            <FiPlus /> Add Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleImages}
            hidden
            accept="image/png,image/jpeg,image/webp"
            multiple={true}
          />
          {error && <span className="secondary text-sm">{error}</span>}
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 border border-[#88888] p-4">
            {images.map((image, index) => {
              return (
                <div className="w-20 h-20 relative" key={index}>
                  <img
                    src={image}
                    alt="imageCover"
                    className="object-cover  border aspect-square border-[#88888]"
                  />
                  <button
                    onClick={() => setImages(images.filter((e) => e !== image))}
                    className=" absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center primary-bg cursor-pointer hover:secondary-bg"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Images;
