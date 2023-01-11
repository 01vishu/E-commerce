import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="max-w-screen-2xl w-full mx-auto overflow-x-hidden">
      <Navbar />
      <main className="m-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
