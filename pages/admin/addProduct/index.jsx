import React from "react";
import Layout from "../../../components/admin/Layout";
import CreateProduct from "../../../components/admin/Product/CreateProduct";
import Brand from "../../../model/Brand";
import Flavour from "../../../model/Flavour";
import Weight from "../../../model/Weight";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";

const AddProduct = ({ brands, flavour, weight, subCategory, category }) => {
  return (
    <div>
      <Layout>
        <CreateProduct
          ProductBrands={brands}
          ProductFlavour={flavour}
          ProductWeight={weight}
          ProductCategory={category}
          ProductSubCategory={subCategory}
        />
      </Layout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const brands = await Brand.find().select("name");
  const flavour = await Flavour.find().select("name");
  const weight = await Weight.find().select("name");
  const category = await Category.find().select("name");
  const subCategory = await SubCategory.find().select("name");
  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands)),
      flavour: JSON.parse(JSON.stringify(flavour)),
      weight: JSON.parse(JSON.stringify(weight)),
      category: JSON.parse(JSON.stringify(category)),
      subCategory: JSON.parse(JSON.stringify(subCategory)),
    },
  };
}

export default AddProduct;
