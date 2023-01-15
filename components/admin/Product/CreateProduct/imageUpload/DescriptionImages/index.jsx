/* eslint-disable @next/next/no-img-element */
import { FiPlus } from "react-icons/fi";
const DescriptionImages = ({ descriptionImages, setDescriptionImages }) => {
  const handleDescriptionImages = (e) => {
    const selectImage = e.target.files;
    const selectImagesArray = Array.from(selectImage);
    const imagesArray = selectImagesArray.map((image) => {
      const encodeImage = new FileReader();
      encodeImage.readAsDataURL(image);
      encodeImage.addEventListener("load", () => {
        setDescriptionImages((prev) => prev.concat(encodeImage.result));
      });
    });
  };
  return (
    <>
      <div className="flex flex-col-reverse gap-4">
        <div>
          <label
            htmlFor="descriptionImages"
            className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          >
            <FiPlus /> Add Images
          </label>
          <input
            type="file"
            name="descriptionImages"
            id="descriptionImages"
            onChange={handleDescriptionImages}
            hidden
            accept="image/png,image/jpeg,image/webp"
            multiple={true}
          />
        </div>

        {descriptionImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 border border-[#88888] p-4">
            {descriptionImages.map((image, index) => {
              return (
                <div className="w-20 h-20 relative" key={index}>
                  <img
                    src={image}
                    alt="imageCover"
                    className="object-cover  border aspect-square border-[#88888]"
                  />
                  <button
                    onClick={() =>
                      setDescriptionImages(
                        descriptionImages.filter((e) => e !== image)
                      )
                    }
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

export default DescriptionImages;
