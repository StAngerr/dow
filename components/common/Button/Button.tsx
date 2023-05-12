import React, { useMemo } from "react";

export type ButtonType = "primary" | "secondary" | "default" | "link";

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: ButtonType;
  children?: React.ReactNode;

  href?: string;
}

export const Button = ({
  children,
  type = "default",
  href = "",
  ...props
}: Props) => {
  const buttonClasses = useMemo(() => {
    if (type === "primary") {
      return "bg-primary text-white px-4 hover:bg-button-hover py-2 rounded-md";
    }
    if (type === "secondary") {
      return "border-2 border-button-default text-button-default hover:bg-button-hover hover:text-white px-4 py-2 rounded-md";
    }
  }, [type]);

  if (type === "link") {
    return (
      <a
        {...props}
        href={href}
        className="text-link-default hover:text-link-hover transition-colors duration-300 ease-in-out"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      className={"transition-colors duration-300 ease-in-out " + buttonClasses}
    >
      {children}
    </button>
  );
};
