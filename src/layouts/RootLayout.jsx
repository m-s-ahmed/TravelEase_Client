import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
