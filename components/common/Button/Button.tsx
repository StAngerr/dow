import React, { ButtonHTMLAttributes, useMemo } from "react";
import classNames from "classnames";

export type ButtonType = "primary" | "secondary" | "default" | "link";

export interface Props
  extends React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  color?: ButtonType;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  color = "default",
  href = "",
  className = "",
  disabled = false,
  ...props
}: Props) => {
  const buttonClasses = useMemo(() => {
    if (color === "primary") {
      return `bg-primary text-white px-4 ${
        !disabled ? "hover:bg-button-hover" : ""
      } py-2 rounded-md`;
    }
    if (color === "secondary") {
      return `border-2 border-button-default text-button-default ${
        !disabled ? "hover:bg-button-hover" : ""
      } hover:text-white px-4 py-2 rounded-md`;
    }
  }, [color, disabled]);

  const disabledStyles = useMemo(
    () => (disabled ? "opacity-70 hover:" : ""),
    [disabled]
  );

  if (color === "link") {
    return (
      <a
        {...(props as React.HTMLProps<HTMLAnchorElement>)}
        href={href || undefined}
        className={classNames(
          "text-link-default hover:text-link-hover transition-colors duration-300 ease-in-out",
          className,
          disabledStyles,
          disabledStyles ? "hover:text-link-default" : ""
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...(props as React.HTMLProps<HTMLButtonElement>)}
      className={classNames(
        "transition-colors duration-300 ease-in-out",
        buttonClasses,
        className,
        disabledStyles
      )}
    >
      {children}
    </button>
  );
};
