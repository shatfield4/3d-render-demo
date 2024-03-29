import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import PackageRender from "./components/PackageRender";
import Footer from "./components/Footer";
import LogoRender from "./components/LogoRender";
import Navbar from "./components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-900 text-white">
        <Head>
          <title>Ecommerce Branding Demo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
          <PackageRender />
          <div className="m-5 w-full border-neutral-700 border-4" />
          <LogoRender />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
