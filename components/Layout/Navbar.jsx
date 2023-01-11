import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/Logo.png";
import { useRouter } from "next/router";
import style from "./style.module.scss";
import {
  BsCalendarDay,
  BsPhone,
  BsSearch,
  BsPerson,
  BsBag,
  BsTag,
  BsPersonFill,
} from "react-icons/bs";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import { clearCart, selectCart } from "../../src/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
const Navbar = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const itemQty = useSelector(selectCart);
  const pathname = router.pathname;
  const [nav, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQurery, setSearchQurery] = useState("");
  const onSearchChange = (e) => {
    setSearchQurery(e.target.value);
  };
  const onSearch = () => {
    router.push(
      `${process.env.BASE_URL}/shop/?search=${searchQurery
        .split(" ")
        .join("+")}`
    );
  };
  const handleNav = () => {
    setNav(!nav);
    setIsOpen(false);
  };

  const navButton = (Icon, BageNumber) => {
    return (
      <div className={style.navbar}>
        <button className={style.navbar__button}>
          {Icon}
          {BageNumber && itemQty.length > 0 ? (
            <div className={style.navbar__button__number}>{BageNumber}</div>
          ) : (
            ""
          )}
        </button>
      </div>
    );
  };
  const detailComponent = (Icon, Line1, Line2, Line3) => {
    return (
      <div className=" hidden lg:flex items-center gap-4">
        <div className="primary-bg p-3 w-fit rounded-full">{Icon}</div>
        <div>
          <p className="text-sm">{Line1}</p>
          <p className="text-xs">
            {Line2} <span className={`text-green-600`}>{Line3}</span>
          </p>
        </div>
      </div>
    );
  };

  const navList = (navTitle, href) => {
    return (
      <Link href={href}>
        <li className="link link-underline link-underline-black">{navTitle}</li>
      </Link>
    );
  };

  return (
    <>
      <nav className="p-2 flex  lg:flex-col justify-between gap-4  border-[#f4f4f4] border-b-2 pb-4">
        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[70%] h-full border-r z-20 primary-bg ease-in-out duration-300 py-8"
              : "ease-in-out duration-300 fixed left-[-100%]"
          }
        >
          <span className="text-3xl font-bold secondary m-4">MENU</span>
          <li className="p-4 border-b border-[#88888] cursor-pointer">Home</li>
          <li className="p-4 border-b border-[#88888] cursor-pointer">
            Company
          </li>
          <li className="p-4 border-b border-[#88888] cursor-pointer">
            Resources
          </li>
          <li className="p-4 border-b border-[#88888] cursor-pointer">About</li>
          <li className="p-4">Contact</li>
        </ul>
        <div className="flex items-center justify-between ">
          <div className="w-24 md:w-32">
            <Image
              src={Logo}
              alt="LOGO"
              width={150}
              height={150}
              onClick={() => {
                router.push("/"), setIsOpen(false);
              }}
            />
          </div>
          {detailComponent(
            <BsCalendarDay size={20} />,
            "Mon-Sat 9h30-21h",
            "Sunday",
            "Close"
          )}
          {detailComponent(
            <BsPhone size={20} />,
            "Have a Question?",
            "Call us: ",
            "+91 88021xxxxx"
          )}
          {detailComponent(
            <BsTag size={20} />,
            "Every Weekend Sale!",
            "Discount ",
            "upto 50% off"
          )}
        </div>
        {pathname !== "/auth/login" &&
        pathname !== "/auth/register" &&
        pathname !== "/auth/forgot" &&
        pathname !== "/auth/reset" ? (
          <div className="  px-4 flex items-center justify-between">
            <ul className="hidden lg:flex items-center gap-4 lg:gap-8">
              {navList("Home", "/")}
              {navList("Categories", "/")}
              {navList("Sale", "/")}
              {navList("Contact", "/")}
              {navList("About", "/")}
              {navList("Verification", "/")}
            </ul>
            <div className="flex items-center gap-4">
              <div className=" hidden pl-2 pr-8  rounded-full md:flex items-center primary-bg ">
                <input
                  type={"text"}
                  className=" py-2 lg:px-4 px-2 rounded-full primary-bg placeholder:text-sm focus:outline-none"
                  placeholder="Search..."
                  onChange={onSearchChange}
                  value={searchQurery}
                />
                <BsSearch onClick={onSearch} className="cursor-pointer" />
              </div>
              <div className="relative">
                <div onClick={() => setIsOpen(!isOpen)}>
                  {session?.user?.image ? (
                    <img
                      src={session.user?.image}
                      alt={session.user?.name}
                      className="w-10 rounded-full cursor-pointer"
                    />
                  ) : (
                    navButton(
                      isOpen ? (
                        <BsPersonFill size={20} />
                      ) : (
                        <BsPerson size={20} />
                      )
                    )
                  )}
                </div>
                {isOpen && (
                  <div className="absolute z-20 my-2 bg-white shadow w-24 flex flex-col left-0">
                    {!session && (
                      <Link className="block py-2 px-4" href="/auth/login">
                        Login
                      </Link>
                    )}
                    {!session && (
                      <Link
                        className="block py-2 px-4"
                        href="/auth/register"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    )}
                    {session && (
                      <Link
                        className="block py-2 px-4"
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                    )}
                    {session && (
                      <a
                        className="block py-2 px-4 cursor-pointer"
                        onClick={() => {
                          signOut(), dispatch(clearCart());
                        }}
                      >
                        Log Out
                      </a>
                    )}
                  </div>
                )}
              </div>
              <Link href={"/cart"}>
                {navButton(<BsBag size={20} />, itemQty.length)}
              </Link>
              <div className="flex items-center lg:hidden ">
                <div
                  onClick={handleNav}
                  className="block lg:hidden cursor-pointer"
                >
                  {nav
                    ? navButton(<RiCloseFill size={15} />)
                    : navButton(<RiMenu3Line size={15} />)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>

      {pathname !== "/auth/login" &&
        pathname !== "/auth/register" &&
        pathname !== "/cart" &&
        pathname !== "/checkout" &&
        pathname !== "/auth/forgot" &&
        pathname !== "/auth/reset" && (
          <div className="pl-2 pr-8 flex rounded-3xl items-center md:hidden primary-bg mx-2 my-4">
            <input
              type={"text"}
              className=" py-2 px-2 rounded-3xl primary-bg w-full placeholder:text-sm focus:outline-none"
              placeholder="Search..."
              onChange={onSearchChange}
              value={searchQurery}
            />
            <BsSearch onClick={onSearch} className="cursor-pointer" />
          </div>
        )}
    </>
  );
};

export default Navbar;
