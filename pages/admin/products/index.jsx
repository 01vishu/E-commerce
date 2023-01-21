import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import Product from "../../../components/admin/Product";

const Products = ({ Query }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      function objectToQueryString(obj) {
        return Object.keys(obj)
          .map((key) => key + "=" + obj[key])
          .join("&");
      }
      const query = objectToQueryString(Query);
      const response = await axios.get(
        `/api/product?${query}&fields=name,slug,brand,price,priceDiscount,imageCover,flavour,weight,availableQuantity`
      );
      setData(response.data.data);
    };
    loadData();
  }, []);
  console.log(data);
  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ">
          {data?.map((item) => {
            return <Product key={item._id} data={item} />;
          })}
        </div>
      </Layout>
    </>
  );
};
export async function getServerSideProps(context) {
  const Query = context.query;

  return {
    props: { Query },
  };
}
export default Products;
