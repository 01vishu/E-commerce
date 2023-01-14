import React from "react";
import Layout from "../../../components/admin/Layout";
import CreateProduct from "../../../components/admin/Product/CreateProduct";
import Brand from "../../../model/Brand";
import ProductTitle from "../../../model/ProductTitle";
import Flavour from "../../../model/Flavour";
import Weight from "../../../model/Weight";
import Category from "../../../model/Category";
import SubCategory from "../../../model/SubCategory";

const AddProduct = ({
  brands,
  productTitle,
  flavour,
  weight,
  subCategory,
  category,
}) => {
  return (
    <div>
      <Layout>
        <CreateProduct
          ProductBrands={brands}
          ProductTitle={productTitle}
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
  const productTitle = await ProductTitle.find().select("name");
  const flavour = await Flavour.find().select("name");
  const weight = await Weight.find().select("name");
  const category = await Category.find().select("name");
  const subCategory = await SubCategory.find().select("name");
  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands)),
      productTitle: JSON.parse(JSON.stringify(productTitle)),
      flavour: JSON.parse(JSON.stringify(flavour)),
      weight: JSON.parse(JSON.stringify(weight)),
      category: JSON.parse(JSON.stringify(category)),
      subCategory: JSON.parse(JSON.stringify(subCategory)),
    },
  };
}

export default AddProduct;
