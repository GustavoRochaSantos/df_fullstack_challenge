import { useUserStore } from "@/store";
import React from "react";

interface Params {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: Params) => {
  if (!isOpen) {
    return;
  }
  return (
    <div className="absolute top-0 left-0 min-h-full min-w-full z-50 bg-gray-200/90 flex justify-center items-center">
      {children}
    </div>
  );
};

export default Modal;
