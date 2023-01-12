import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <>
      <div className="max-w-screen-2xl w-full mx-auto overflow-x-hidden">
        {!pathname.startsWith("/admin") && <Navbar />}
        <main className="m-2">{children}</main>
        {!pathname.startsWith("/admin") && <Footer />}
      </div>
    </>
  );
};

export default Layout;
