import axios from "axios";
import { useEffect, useState } from "react";
import FamousProduct from "../components/MostFamous/ProductList";
import ProductList from "../components/Product/ProductList";
import Slider from "../components/Slider/Slider";
import { PulseLoader } from "react-spinners";

export default function Home() {
  const [productData, SetproductData] = useState("");
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(`/api/product`);
      SetproductData(response.data);
    };
    loadData();
  }, []);
  return (
    <>
      {productData === "" && (
        <div className="flex justify-center items-center h-screen ">
          <PulseLoader loading={productData === ""} color="#8d735f" />
        </div>
      )}
      {productData != "" ? (
        <div>
          <Slider />
          <ProductList product={productData?.data} />
          <FamousProduct product={productData?.data} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
