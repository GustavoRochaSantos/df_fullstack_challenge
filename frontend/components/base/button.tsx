import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React, { ButtonHTMLAttributes } from "react";

interface Params extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "secondary" | "ghost" | "danger" | "submit";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "after" | "before";
  loading?: Boolean;
  fullSize?: Boolean;
}

const Button = ({
  type = "primary",
  children,
  icon,
  iconPosition = "before",
  loading = false,
  fullSize,
  className,
  ...props
}: Params) => {
  const baseButton = (children: React.ReactNode) => {
    return (
      <button
        className={`btn ${type} ${fullSize && "w-full"} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  if (loading) {
    return baseButton(<Spinner size={30} className="animate-spin" />);
  }

  return baseButton(
    <>
      {icon && iconPosition === "before" && icon}
      {children}
      {icon && iconPosition === "after" && icon}
    </>
  );
};

export default Button;
