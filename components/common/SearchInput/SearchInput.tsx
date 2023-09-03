import classNames from "classnames";
import { debounce } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";

export interface SearchInputItem {
  id: string;
  label: string;
}

interface Props {
  onSearch?: (q: string) => Promise<SearchInputItem[]>;
  onChange?: (q: string) => void;
  onSelect?: (item: SearchInputItem) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  placeholder,
  onSearch,
  className,
  onSelect,
  onChange,
}: Props) => {
  const [searchItems, setSearchItems] = useState<SearchInputItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleInputChange = useCallback(
    debounce((value: string) => {
      if (!value.trim()) {
        setSearchItems([]);
        return;
      }

      if (onSearch) {
        setIsLoading(true);
        onSearch(value)
          .then((data: SearchInputItem[]) => setSearchItems(data))
          .finally(() => setIsLoading(false));
      }

      onChange && onChange(value);
    }, 300),
    [onSearch, onChange]
  );

  const handleSelectItem = useCallback(
    (item: SearchInputItem) => {
      if (inputRef.current) {
        inputRef.current.value = item.label;
      }
      setSelectedItem(item.id);
      onChange && onChange(item.label);
      onSelect && onSelect(item);
      setShowList(false);
    },
    [onSelect, onChange]
  );

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleInputChange(e.target.value),
    [handleInputChange]
  );

  const inputClasses = useMemo(
    () =>
      classNames(
        "py-2 px-5 text-text border-primary outline-primary rounded-l border w-full",
        className
      ),
    [className]
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        onFocus={() => setShowList(true)}
        className={inputClasses}
        disabled={isLoading}
        type="text"
        onChange={inputChangeHandler}
        placeholder={placeholder}
      />

      {showList && searchItems.length ? (
        <ul className="mt-1 absolute w-full bg-bg1 border-t rounded-b shadow-md">
          {searchItems.map(({ id, label }: SearchInputItem) => (
            <li
              key={id}
              className={classNames(
                "px-3 py-1 border-b border-primary hover:bg-bg2 hover:text-primary text-text cursor-pointer",
                selectedItem === id ? "bg-accent2 text-bg2" : null
              )}
              onClick={() => handleSelectItem({ id, label })}
            >
              <span className="text-lg">{label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
