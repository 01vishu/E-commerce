import axios from "axios";
import { useEffect, useState } from "react";
import FamousProduct from "../components/MostFamous/ProductList";
import ProductList from "../components/Product/ProductList";
import Slider from "../components/Slider/Slider";
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
      <Slider />
      <div>
        <ProductList product={productData?.data} />
      </div>
      <div className="primary-bg h-36 m-4">
        <div>
          <div className="">Image</div>
        </div>
      </div>
      <FamousProduct product={productData?.data} />
    </>
  );
}
