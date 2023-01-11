import axios from "axios";
import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineFilter } from "react-icons/ai";
import FilterMenu from "../../components/Search/FilterMenu";
import ProductList from "../../components/Search/ProudctList";
import SaleProductList from "../../components/Search/SaleProductList";

const Shop = ({ data }) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <section>
      <div className="flex justify-between items-center">
        <span className="text-sm">Search Result</span>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[70%] md:hidden max-w-[300px] h-full border-r z-10 bg-white ease-in-out duration-300 py-8"
              : "ease-in-out duration-300 fixed md:hidden left-[-200%]"
          }
        >
          <FilterMenu
            initialMin={0}
            initialMax={1000}
            min={0}
            max={20000}
            step={100}
            priceCap={1000}
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            name="sort"
            id="sort"
            className="appearance-none border-[#f4f4f4] border-2 text-sm  px-2 py-1 focus-visible:outline-[#8D735F]"
          >
            <option value="popular" defaultChecked={true}>
              Popular
            </option>
            <option value="newest">Newest</option>
          </select>
          <div onClick={handleNav} className="block md:hidden cursor-pointer">
            {nav ? (
              <AiFillCloseCircle size={20} />
            ) : (
              <AiOutlineFilter size={20} />
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex my-4 gap-4">
        <div className="hidden md:flex flex-col gap-4 max-w-[300px]">
          <FilterMenu
            initialMin={0}
            initialMax={1000}
            min={0}
            max={20000}
            step={100}
            priceCap={1000}
          />
          <SaleProductList />
        </div>
        <ProductList data={data} />
      </div>
    </section>
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
    props: { data: response.data },
  };
}

export default Shop;
