import React from "react";
import Layout from "../../../components/admin/Layout";
import CreateProduct from "../../../components/admin/Product/CreateProduct";
import Brand from "../../../model/Brand";

const AddProduct = ({ brands }) => {
  return (
    <div>
      <Layout>
        <CreateProduct brands={brands} />
      </Layout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const brands = await Brand.find().select("name");
  return {
    props: { brands: JSON.parse(JSON.stringify(brands)) },
  };
}

export default AddProduct;
