"use client";
import { useSideMenuStore } from "@/store";
import { Bell, List } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

interface Params {}

const Header = ({}: Params) => {
  const menuToggle = useSideMenuStore((state) => state.toggle);

  return (
    <header className="flex justify-between items-center p-3 bg-blue-950 text-white grid-rows-2 shadow-lg">
      <div className="flex justify-center items-center gap-5">
        <Image
          src="/LogoKEG_branco_200.png"
          alt="KegSoftware"
          height={60}
          width={100}
          priority
        />
        <button onClick={() => menuToggle()}>
          <List size={24} />
        </button>
      </div>

      <div className="flex gap-3 px-3">
        <Bell size={24} />
        <span>Minha conta</span>
      </div>
    </header>
  );
};

export default Header;
