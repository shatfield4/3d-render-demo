import { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import PackageRender from "./components/PackageRender";
import Footer from "./components/Footer";
import LogoRender from "./components/LogoRender";
import Navbar from "./components/Navbar";

// load environment variables
// require("dotenv").config();



const Home: NextPage = () => {


  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Ecommerce Branding Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="mt-10">
          <PackageRender />
        </div>
        <hr className="border-1 border-gray-400 p-2 w-full m-20" />
        <div className="mb-20">
          <LogoRender />
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Home;