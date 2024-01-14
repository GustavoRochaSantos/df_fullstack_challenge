"use client";
import Input from "@/components/base/input";
import { useSideMenuStore } from "@/store";
import {
  House,
  MagnifyingGlass,
  Money,
  Shield,
} from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

interface Data {
  title: string;
  link: string;
  icon?: React.ReactNode;
  subMenu?: Data[];
}
const SideMenu = () => {
  const isOpen = useSideMenuStore((state) => state.isOpen);
  const data: Data[] = [
    {
      title: "Início",
      link: "/",
      icon: <House size={17} />,
    },
    {
      title: "Financeiro",
      link: "/financeiro",
      icon: <Money size={17} />,
    },
    {
      title: "Segurança",
      link: "/seguranca",
      icon: <Shield size={17} />,
    },
  ];
  const [dataFiltered, setDataFiltered] = useState<Data[]>(data);

  const filterBySearch = (value: string) => {
    console.log("filter", value);
    const newData = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setDataFiltered(newData);
  };
  return (
    <aside
      className={`w-64 shadow-xl h-full p-1.5 bg-gray-100 border-r-2 invisible sm:visible transition-all ease-in-out duration-200 ${
        isOpen ? "ml-0" : "-ml-64"
      }`}
    >
      <div>
        <Input
          id="search-menu"
          type="search"
          icon={<MagnifyingGlass size={20} />}
          onChange={(e) => filterBySearch(e.target.value)}
        />
      </div>
      <ul>
        {dataFiltered.map((item) => (
          <li className="flex items-center gap-2 px-2" key={item.link}>
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
