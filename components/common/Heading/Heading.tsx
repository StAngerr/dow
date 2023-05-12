import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  level: "1" | "2" | "3" | "4" | "5" | "6";
  className?: string;
}

export const Heading = ({ level, className, children }: Props) => {
  const TagName = `h${level}` as keyof JSX.IntrinsicElements;

  const headingClasses = classNames(className, {
    "text-primary": level === "1",
    "text-accent1": level === "2",
    "text-accent2": level === "3",
    "text-accent3": level === "4",
    "text-2xl font-bold tracking-tight": level === "1",
    "text-lg font-bold tracking-tight": level === "2",
    "text-base font-semibold tracking-tight": level === "3",
    "text-sm font-semibold tracking-tight": level === "4",
  });

  return <TagName className={headingClasses}>{children}</TagName>;
};
