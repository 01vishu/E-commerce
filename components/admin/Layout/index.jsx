/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { MdAnalytics, MdDashboard, MdMessage } from "react-icons/md";
import { HiCurrencyRupee, HiPlusCircle, HiUsers } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  BiCategory,
  BiCategoryAlt,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { RiCoupon2Fill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const Sidebar = (Icon, Name, Pathname) => {
    return (
      <Link href={`/admin/${Pathname}`}>
        <div
          className={`flex items-center gap-2  px-4 py-2 rounded-md ${
            pathname.startsWith(`/admin/${Pathname}`) && "secondary-bg"
          }`}
        >
          <div className="text-xl"> {Icon}</div>
          <span className=" text-sm font-semibold">{Name}</span>
        </div>
      </Link>
    );
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-8">
      <div className="absolute md:relative h-full">
        <div
          className={`flex-1 flex-col flex gap-4 p-4 bg-[#f4f4f4] rounded-lg h-full relative md:static translate-x-1 duration-200 ease-linear ${
            open
              ? "-left-[0%]"
              : " -left-[105%] translate-x-1 duration-200 ease-linear"
          }`}
        >
          <div className="flex items-center flex-wrap border-b-2 py-4 border-[#88888] gap-2">
            <img
              src="https://pbs.twimg.com/profile_images/1592354382640975873/0akVKsst_400x400.jpg"
              alt=""
              className="w-16 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm">Welcome Back</span>
              <span className="text-xs text-primary">Vishu Verma</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {Sidebar(<MdDashboard />, "Dashboard", "dashboard")}
            {Sidebar(<MdAnalytics />, "Sales", "sales")}
            {Sidebar(<HiCurrencyRupee />, "Orders", "orders")}
            {Sidebar(<HiUsers />, "Users", "users")}
            {Sidebar(<MdMessage />, "Messages", "messages")}
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="textxl w-full pb-2 font-semibold text-primary border-b-2 border-[#88888]">
              Product
            </span>
            <div>
              {Sidebar(<CgMenuGridR />, "Products", "products")}
              {Sidebar(<HiPlusCircle />, "Add Product", "addProduct")}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="textxl w-full pb-2 font-semibold text-primary border-b-2 border-[#88888]">
              Category/Subs
            </span>
            <div>
              {Sidebar(<BiCategory />, "Category", "category")}
              {Sidebar(<BiCategoryAlt />, "Sub Category", "subCategory")}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="textxl w-full pb-2 font-semibold text-primary border-b-2 border-[#88888]">
              Coupon
            </span>
            <div>{Sidebar(<RiCoupon2Fill />, "Coupons", "coupons")}</div>
          </div>
          <button
            className="block md:hidden absolute -right-6 top-10 primary-bg py-2 px-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <BiChevronLeft size={20} /> : <BiChevronRight size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-[4] flex-col flex gap-4">
        <div className="flex border-b pb-2 border-[#88888] items-center justify-between">
          <input
            type={"search"}
            className="border-2 border-[#f4f4f4] py-1 px-2 rounded-full placeholder:text-primary max-w-md w-2/3 sm:w-full placeholder:p-2 placeholder:text-sm"
            placeholder="Search"
          />
          <div className="flex items-center gap-4">
            {/* <img
              src={
                "https://pbs.twimg.com/profile_images/1592354382640975873/0akVKsst_400x400.jpg"
              }
              alt="admin"
              className="w-10 rounded-full"
            /> */}
            <IoNotificationsSharp
              size={25}
              className="text-primary hover:secondary cursor-pointer"
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
