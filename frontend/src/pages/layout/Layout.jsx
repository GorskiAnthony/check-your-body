import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col flex-start">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl mt-8">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
