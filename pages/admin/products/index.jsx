import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import Product from "../../../components/admin/Product";
import AlertDialog from "../../../components/DialogPopup";

const Products = ({ data }) => {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ">
          {data.map((item) => {
            return <Product key={item._id} data={item} />;
          })}
        </div>
      </Layout>
    </>
  );
};
export async function getServerSideProps(context) {
  function objectToQueryString(obj) {
    return Object.keys(obj)
      .map((key) => key + "=" + obj[key])
      .join("&");
  }
  const query = objectToQueryString(context.query);
  const response = await axios.get(`${process.env.URL}/api/product?${query}`);
  return {
    props: { data: response.data.data },
  };
}
export default Products;
