import FamousProduct from "../components/MostFamous/ProductList";
import ProductList from "../components/Product/ProductList";
import Slider from "../components/Slider/Slider";
import mongoose from "mongoose";
import Product from "../model/Product";
export default function Home({ productData }) {
  console.log("DATA", productData);
  return (
    <>
      <Slider />
      <div>
        <ProductList product={productData} />
      </div>
      <div className="primary-bg h-36 m-4">
        <div>
          <div className="">Image</div>
        </div>
      </div>
      <FamousProduct product={productData} />
    </>
  );
}
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI);
  }
  const productData = await Product.find()
    .select("name slug brand price priceDiscount imageCover flavour weight")
    .limit(10);
  return {
    props: { productData: JSON.parse(JSON.stringify(productData)) },
  };
}
