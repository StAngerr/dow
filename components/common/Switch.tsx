import React, { useEffect, useState } from "react";
import classNames from "classnames";

export const ToggleSwitch = (props) => {
  const toggleSwitch = () => {
    props.form.setFieldValue(props.field.name, !props.field.value);
  };

  const switchClasses = classNames(
    "w-12 h-6 rounded-full bg-gray-300 relative cursor-pointer transition",
    props.field?.value ? "bg-blue-500" : "bg-gray-300"
  );

  const circleClasses = classNames(
    "w-6 h-6 rounded-full bg-white absolute top-0 left-0 transition-transform",
    props.field?.value ? "transform translate-x-6" : ""
  );

  return (
    <div className={switchClasses} onClick={toggleSwitch}>
      <div className={circleClasses}></div>
    </div>
  );
};
