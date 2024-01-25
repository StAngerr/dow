import React from "react";
import classNames from "classnames";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleSwitch = ({ value, onChange }: Props) => {
  const toggleSwitch = () => onChange(!value);

  const switchClasses = classNames(
    "w-12 h-6 rounded-full bg-gray-300 relative cursor-pointer transition",
    value ? "bg-blue-500" : "bg-gray-300"
  );

  const circleClasses = classNames(
    "w-6 h-6 rounded-full bg-white absolute top-0 left-0 transition-transform",
    value ? "transform translate-x-6" : ""
  );

  return (
    <div className={switchClasses} onClick={toggleSwitch}>
      <div className={circleClasses}></div>
    </div>
  );
};
