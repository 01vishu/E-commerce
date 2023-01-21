import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageCover from "./imageUpload/imageCover";
import { convertToRaw, Editor, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Images from "./imageUpload/Images";
import { ToastContainer, toast } from "react-toastify";
const RichTextEditor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);
import "react-toastify/dist/ReactToastify.css";

import DescriptionImages from "./imageUpload/DescriptionImages";
import axios from "axios";
import Spiner from "../../../spiner";
const initailValue = {
  name: "",
  brand: "",
  category: "",
  subCategories: [],
  flavour: "",
  weight: "",
  availableQuantity: "",
  price: "",
  priceDiscount: "",
  imageCover: "",
  descriptionImages: [],
};
const CreateProduct = ({
  ProductBrands,

  ProductFlavour,
  ProductWeight,
  ProductCategory,
  ProductSubCategory,
}) => {
  const [value, setValue] = useState(EditorState.createEmpty());

  const [imageCover, setImageCover] = useState("");
  const [images, setImages] = useState([]);
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [product, setProduct] = useState(initailValue);
  const [loading, setLoading] = useState(false);
  const data = convertToRaw(value.getCurrentContent());
  const DescriptionMarkup = draftToHtml(data);

  let {
    name,
    brand,
    category,
    subCategories,
    flavour,
    weight,
    availableQuantity,
    price,
    priceDiscount,
  } = product;
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const onEditorChange = (newState) => {
    setValue(newState);
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`/api/admin/product`, {
        name,
        brand,
        category,
        subCategories,
        flavour,
        weight,
        availableQuantity,
        price,
        priceDiscount,
        descriptionImages,
        description: DescriptionMarkup,
        imageCover,
        images,
      });
      toast.success("Product has been created!");
      setLoading(false);
      setProduct(initailValue);
      setDescriptionImages([]);
      setImageCover("");
      setImages([]);
    } catch (error) {
      setLoading(false);
      if (error) {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Spiner loading={loading} />}
      <ToastContainer />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <TextField
            label="Product Name"
            type={"text"}
            variant="filled"
            id="ProductName"
            value={name}
            name="name"
            onChange={onValueChange}
            required
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Brand">Brand</InputLabel>
          <Select
            labelId="Brand"
            id="Brand"
            value={brand}
            name="brand"
            onChange={onValueChange}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </FormControl>
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
        ></FormControl>
      </div>
      <div className="primary-bg my-4 p-1 rounded-md">
        <RichTextEditor
          editorState={value}
          onEditorStateChange={onEditorChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </div>

      <h2 className="font-semibold text-primary text-xl"> Upload Images</h2>
      <div className="flex flex-col lg:flex-row  my-4 gap-4">
        <div className="flex flex-col gap-4">
          <span className="text-lg font-medium secondary">Image Cover</span>
          <ImageCover imageCover={imageCover} setImageCover={setImageCover} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-lg font-medium secondary">Images</span>

          <Images images={images} setImages={setImages} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-lg font-medium secondary">
            Description Images
          </span>

          <DescriptionImages
            descriptionImages={descriptionImages}
            setDescriptionImages={setDescriptionImages}
          />
        </div>
      </div>
      <button
        className="p-2 flex items-center w-3/4 mx-auto  justify-center primary-bg cursor-pointer hover:secondary-bg"
        onClick={onSubmit}
      >
        Create Product
      </button>
    </>
  );
};

export default CreateProduct;
