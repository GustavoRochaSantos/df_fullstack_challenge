import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";

interface Params {
  children: React.ReactNode;
}

const LayoutDefault = ({ children }: Params) => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex h-full">
        <SideMenu />
        <div className="p-4 flex flex-col w-full ">
          <Breadcrumb />
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LayoutDefault;
