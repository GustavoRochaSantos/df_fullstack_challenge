import React from "react";
import { Input } from "../..";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import SignPremiumSection from "./signPremium";
import NewsSection from "./news";

const AdvertisingSection = () => {
  return (
    <section className="lg:flex flex-col w-96 gap-5 pt-3 pl-3 border-l-2 border-gray-100 hidden lg:block">
      <Input
        id="search-menu"
        type="search"
        icon={<MagnifyingGlass size={20} />}
      />
      <SignPremiumSection />
      <NewsSection />
    </section>
  );
};

export default AdvertisingSection;
