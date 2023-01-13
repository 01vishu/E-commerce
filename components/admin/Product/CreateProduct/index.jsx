import axios from "axios";
import React, { useState } from "react";
import ImageCover from "./imageUpload/imageCover";
const initailValue = {
  name: "",
  brand: "",
  category: "",
  subCategories: [],
  flavour: "",
  weight: "",
  availableQuantity: "",
  description: "",
  price: "",
  priceDiscount: "",
  imageCover: "",
  images: [],
};
const CreateProduct = ({ brands }) => {
  const [imageCover, setImageCover] = useState("");
  const [product, setProduct] = useState(initailValue);
  const {
    name,
    brand,
    category,
    subCategories,
    flavour,
    weight,
    availableQuantity,
    description,
    price,
    priceDiscount,
    images,
  } = product;
  console.log(product);
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <input
        type={"text"}
        className="p-2 border border-[#88888] placeholder:text-sm w-full"
        placeholder="Name"
        value={name}
        name="name"
        onChange={onValueChange}
        required
      />
      <select
        type={"text"}
        className="p-2 border border-[#88888] placeholder:text-sm w-full appearance-none"
        placeholder="Brand"
        value={brand}
        name="brand"
        onChange={onValueChange}
        required
      >
        <option defaultChecked>Select a brand</option>
        {brands.map((brand) => {
          return (
            <option key={brand._id} value={brand.name}>
              {brand.name}
            </option>
          );
        })}
      </select>
      <div className="flex flex-col items-center justify-center gap-4">
        <ImageCover imageCover={imageCover} setImageCover={setImageCover} />
        <button
          className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          onClick={onSubmit}
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
