"use client";
import { Avatar, Button } from "@/components";
import { useSideMenuStore, useUserStore } from "@/store";
import {
  Bell,
  DotsThreeCircle,
  Envelope,
  House,
  MagnifyingGlass,
  Notebook,
  Tag,
  User,
  Users,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "../modal";
import Login from "@/components/partial/Auth/Login";

interface Data {
  title: string;
  link: string;
  icon?: React.ReactNode;
  subMenu?: Data[];
}
const SideMenu = () => {
  const isOpen = useSideMenuStore((state) => state.isOpen);
  const user = useUserStore((state) => state);
  const data: Data[] = [
    {
      title: "Página Inicial",
      link: "/",
      icon: <House size={17} weight="fill" />,
    },
    {
      title: "Explorar",
      link: "#",
      icon: <MagnifyingGlass size={17} />,
    },
    {
      title: "Notificações",
      link: "#",
      icon: <Bell size={17} />,
    },
    {
      title: "Mensagens",
      link: "#",
      icon: <Envelope size={17} />,
    },
    {
      title: "Listas",
      link: "#",
      icon: <Notebook size={17} />,
    },
    {
      title: "Itens salvos",
      link: "#",
      icon: <Tag size={17} />,
    },
    {
      title: "Comunidades",
      link: "#",
      icon: <Users size={17} />,
    },
    {
      title: "Premium",
      link: "#",
      icon: <X size={17} />,
    },
    {
      title: "Perfil",
      link: "#",
      icon: <User size={17} />,
    },
    {
      title: "Mais",
      link: "#",
      icon: <DotsThreeCircle size={17} />,
    },
  ];

  const handleLogin = () => {
    user.loginModalToggle();
  };

  return (
    <aside
      className={`w-[60] lg:w-64 h-full p-4 border-r-[1px] border-gray-100  invisible sm:visible transition-all ease-in-out duration-200  ${
        isOpen ? "ml-0" : "-ml-64"
      }`}
    >
      <div className="flex flex-col h-full justify-between ">
        <ul>
          {data.map((item) => (
            <Link
              className="flex items-center gap-2"
              key={item.title}
              href={item.link}
            >
              <div className="flex justify-center items-center gap-3 p-2">
                {item.icon}
                <span className="hidden lg:block">{item.title}</span>
              </div>
            </Link>
          ))}
          {!user.id && (
            <Button fullSize className="hidden lg:block" onClick={handleLogin}>
              Login
            </Button>
          )}
        </ul>
        {user.id && (
          <div className="flex gap-2 mb-5">
            <Avatar src={user.photo} />
            <div className="hidden lg:block">
              <div>{user.fullName}</div>
              <div>{user.name}</div>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={user.loginModalIsOpen}>
        <Login />
      </Modal>
    </aside>
  );
};

export default SideMenu;
