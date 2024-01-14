import React, { InputHTMLAttributes } from "react";

interface Params extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "after" | "before";
  error?: string;
  success?: boolean;
  fullSize?: boolean;
}

const Input = ({
  iconPosition = "before",
  fullSize = false,
  ...props
}: Params) => {
  const defaultPlaceholder = () => {
    if (props.placeholder) {
      return props.placeholder;
    }

    switch (props.type) {
      case "search":
        return "Pesquisar";
    }
  };

  return (
    <div className={`inputWrapper ${fullSize && "w-full"}`}>
      {props.label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      )}
      <div
        data-test={`input-${props.id}`}
        className={`inputIconWrapper ${props.error ? "error" : ""} 
                  ${props.success ? "success" : ""}`}
      >
        {props.icon && iconPosition === "before" && props.icon}
        <input
          type={props.type}
          placeholder={defaultPlaceholder()}
          className={``}
          {...props}
        />
        {props.icon && iconPosition === "after" && props.icon}
      </div>
      {props.error && (
        <small className="mt-2 text-sm text-red-600 dark:text-red-500">
          {props.error}
        </small>
      )}
    </div>
  );
};

export default Input;
