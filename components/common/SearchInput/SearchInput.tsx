import classNames from "classnames";

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({ placeholder, onChange, className }: Props) => {
  return (
    <input
      className={classNames(
        "py-2 px-5 text-text border-primary outline-primary rounded",
        className
      )}
      type="text"
      placeholder={placeholder}
    />
  );
};
