import React from "react";
import Image from "next/image";
const Description = ({ product }) => {
  return (
    <div>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <p className="font-sans break-words text-primary md:w-3/4 whitespace-pre-line text-sm">
          {product?.description}
        </p>
        <div className="m-1 flex  max-w-sm  max-h-96 justify-center primary-bg">
          <Image
            src={product?.descriptionImage || product.imageCover}
            alt={""}
            width={430}
            height={430}
            className="mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
