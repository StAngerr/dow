import React, { useCallback, useState } from "react";
import classNames from "classnames";

export interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  onChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, onChange }: Props) => {
  const [active, setActive] = useState(tabs[0].id);

  const handleTabClick = useCallback(
    (id: string) => {
      setActive(id);
      onChange(id);
    },
    [onChange]
  );

  return (
    <div className="w-full flex justify-center border-b border-accent1 shadow-sm">
      {tabs.map((i: Tab) => {
        const baseStyles =
          "p-5 hover:text-bg2 hover:bg-button-hover w-40 rounded-t-md";
        const activeStyles =
          i.id === active
            ? " border-t border-l border-r border-border bg-button-default text-bg1"
            : "";
        return (
          <button
            onClick={() => handleTabClick(i.id)}
            className={classNames(baseStyles, activeStyles)}
          >
            {i.label}
          </button>
        );
      })}
    </div>
  );
};
