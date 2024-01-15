import useModalStore from "@/store/modals";
import React from "react";

interface Params {
  modalName?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children, modalName }: Params) => {
  const modal = useModalStore((state) => state);

  if (!isOpen) {
    return;
  }

  const handleClose = () => {
    if (modalName) modal.toggle(modalName);
  };

  return (
    <div className="absolute top-0 left-0 min-h-full min-w-full z-50 bg-gray-200/90 flex justify-center items-center">
      <div className="card-white">
        <a
          href="#"
          onClick={handleClose}
          className="absolute left-2.5 top-1.5 text-gray-400 font-semibold"
        >
          X
        </a>
        {children}
      </div>
    </div>
  );
};

export default Modal;
