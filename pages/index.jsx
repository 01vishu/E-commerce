import axios from "axios";
import FamousProduct from "../components/MostFamous/ProductList";
import ProductList from "../components/Product/ProductList";
import Slider from "../components/Slider/Slider";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
export default function Home({ productData }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Slider />
      <div>
        <ProductList product={productData.data} />
      </div>
      <div className="primary-bg h-36 m-4">
        <div>
          <div className="">Image</div>
        </div>
      </div>
      <FamousProduct product={productData.data} />
    </>
  );
}
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  const productData = await axios
    .get(
      `${process.env.URL}/api/product?fields=name,slug,brand,price,priceDiscount,imageCover,flavour,weight&limit=10`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return {
    props: { productData },
  };
}
