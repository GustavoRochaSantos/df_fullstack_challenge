import React from "react";

interface Params {}

const Footer = ({}: Params) => {
  return (
    <footer className="flex justify-end items-center border-t-2 p-3 mt-2 sticky">
      <small className="text-end">KEG Software - Versão 2023.01</small>
    </footer>
  );
};

export default Footer;
