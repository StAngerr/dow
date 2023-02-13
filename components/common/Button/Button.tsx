import React from "react";

export type ButtonType = "primary" | "default";

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: ButtonType;
  children?: React.ReactNode;
}

export const Button = ({ children, type = "default", ...props }: Props) => {
  switch (type) {
    case "primary":
      return (
        <button
          {...props}
          className={
            "px-4 h-8 transition rounded bg-blue-400 text-white hover:bg-white hover:text-blue-400 border border-blue-400 dark:bg-blue-800"
          }
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          {...props}
          className={
            "mr-4 px-4 h-8 transition rounded border border-white hover:border-slate-400 hover:text-slate-700 text-slate-400 dark:bg-violet-600 dark:text-white"
          }
        >
          {children}
        </button>
      );
  }
};
