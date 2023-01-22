import axios from "axios";
import { useEffect, useState } from "react";
import Description from "../../components/ProductPage/Details/Description";
import Reviews from "../../components/ProductPage/Details/Reviews";
import ImagePreview from "../../components/ProductPage/ImagePreview";
import ProductInfo from "../../components/ProductPage/ProductInfo";
const ProductDetail = ({ querySlug }) => {
  const [selectDescription, setSelectDescription] = useState(true);
  const [selectReview, setSelectReview] = useState(false);
  const [productData, setproductData] = useState(null);
  const [variant, setVariant] = useState(null);
  // const productData = data;
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(`/api/product/${querySlug}`);
      const variant = await axios.get(`/api/product/variant/${querySlug}`);
      setproductData(response.data.data);
      setVariant(variant.data.data);
    };
    loadData();
  }, []);
  console.log("Data", productData);
  console.log("Varient", variant);
  const handleSelectDescription = () => {
    setSelectDescription(true);
    setSelectReview(false);
  };
  const handleSelectReview = () => {
    setSelectReview(true);
    setSelectDescription(false);
  };

  return (
    <div className="m-2 flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row">
        {/* PRODUCT Image*/}
        <ImagePreview product={productData} />
        <ProductInfo productData={productData} variant={variant} />
      </div>
      <div className="m-1 flex flex-col gap-4">
        <div className="flex  items-center gap-4 sm:gap-12">
          <button
            className="font-medium hover:secondary focus-within:secondary"
            onClick={handleSelectDescription}
          >
            Description
          </button>
          <button
            className="font-medium hover:secondary focus-within:secondary"
            onClick={handleSelectReview}
          >
            Reviews (4)
          </button>
        </div>
        {selectDescription && <Description product={productData} />}
        {selectReview && <Reviews product={productData} />}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // const response = await axios.get(`/api/product/${context.query.slug}`);
  // const variant = await axios.get(`/api/product/variant/${context.query.slug}`);
  const querySlug = context.query.slug;
  // const response = await Product.findOne({ slug: context.query.slug });
  // let product = await Product.findOne({ slug: context.query.slug });

  // let variants = await Product.find({
  //   name: product.name,
  // });
  // let flavourWeight = {};
  // for (let item of variants) {
  //   if (Object.keys(flavourWeight).includes(item.flavour)) {
  //     flavourWeight[item.flavour][item.weight] = { slug: item.slug };
  //   } else {
  //     flavourWeight[item.flavour] = {};
  //     flavourWeight[item.flavour][item.weight] = { slug: item.slug };
  //   }
  // }

  return {
    props: {
      querySlug,
      // data: JSON.parse(JSON.stringify(response)),
      // variant: flavourWeight,
    },
  };
}

export default ProductDetail;
