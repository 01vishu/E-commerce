import axios from "axios";
import { useState } from "react";
import Description from "../../components/ProductPage/Details/Description";
import Reviews from "../../components/ProductPage/Details/Reviews";
import ImagePreview from "../../components/ProductPage/ImagePreview";
import ProductInfo from "../../components/ProductPage/ProductInfo";
const ProductDetail = ({ data, variant, review }) => {
  console.log(data);
  const [selectDescription, setSelectDescription] = useState(true);
  const [selectReview, setSelectReview] = useState(false);
  const productData = data.data;
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
  const response = await axios.get(
    `${process.env.URL}/api/product/${context.query.slug}`
  );
  const variant = await axios.get(
    `${process.env.URL}/api/product/variant/${context.query.slug}`
  );

  return {
    props: {
      data: JSON.parse(JSON.stringify(response.data)),
      variant: variant.data.data,
    },
  };
}

export default ProductDetail;
