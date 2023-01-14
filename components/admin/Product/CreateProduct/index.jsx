import {
  Checkbox,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
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
  descriptionImages: [],
};
const CreateProduct = ({
  ProductBrands,
  ProductTitle,
  ProductFlavour,
  ProductWeight,
  ProductCategory,
  ProductSubCategory,
}) => {
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
    descriptionImages,
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
    <>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="ProductName">Product Name</InputLabel>
          <Select
            labelId="ProductName"
            id="ProductName"
            value={name}
            name="name"
            onChange={onValueChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductTitle.map((title) => {
              return (
                <MenuItem key={title._id} value={title.name}>
                  {title.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Brand">Brand</InputLabel>
          <Select
            labelId="Brand"
            id="Brand"
            value={brand}
            name="brand"
            onChange={onValueChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductBrands.map((brand) => {
              return (
                <MenuItem key={brand._id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Category">Category</InputLabel>
          <Select
            labelId="Category"
            id="Category"
            value={category}
            name="category"
            onChange={onValueChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductCategory.map((category) => {
              return (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Sub Category">Sub Categories</InputLabel>
          <Select
            labelId="Sub Categories"
            id="Sub Categories"
            multiple
            value={subCategories}
            name="subCategories"
            onChange={onValueChange}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductSubCategory.map((subCategories) => {
              return (
                <MenuItem key={subCategories._id} value={subCategories.name}>
                  <ListItemText primary={subCategories.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Flavour">Flavour</InputLabel>
          <Select
            labelId="Flavour"
            id="Flavour"
            value={flavour}
            name="flavour"
            onChange={onValueChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductFlavour.map((flavour) => {
              return (
                <MenuItem key={flavour._id} value={flavour.name}>
                  {flavour.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Weight">Weight</InputLabel>
          <Select
            labelId="Weight"
            id="Weight"
            value={weight}
            name="weight"
            onChange={onValueChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProductWeight.map((weight) => {
              return (
                <MenuItem key={weight._id} value={weight.name}>
                  {weight.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            id="AvilableQty"
            label="Available Quantity"
            variant="filled"
            value={availableQuantity}
            name="availableQuantity"
            onChange={onValueChange}
            type="number"
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="Price">Price</InputLabel>
          <FilledInput
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            id="Price"
            label="Price"
            variant="filled"
            value={price}
            name="price"
            onChange={onValueChange}
            type="number"
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="PriceDiscount">Price Discount</InputLabel>

          <FilledInput
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            id="PriceDiscount"
            label="Price Discount"
            variant="filled"
            value={priceDiscount}
            name="priceDiscount"
            onChange={onValueChange}
            type="number"
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <TextareaAutosize
            id="Description"
            aria-label=""
            minRows={3}
            placeholder="Description"
            style={{ border: "primary" }}
          />
        </FormControl>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <ImageCover imageCover={imageCover} setImageCover={setImageCover} />
        <button
          className="p-2 flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          onClick={onSubmit}
        >
          Create Product
        </button>
      </div>
    </>
  );
};

export default CreateProduct;
