import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Button } from "../common/Button/Button";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../constants";
import { SearchInput } from "../common/SearchInput/SearchInput";
import classNames from "classnames";

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

interface DeleteSelectBtnProps {
  value: string;
  onClick: () => void;
}

export const SearchPanel = ({
  currentDate,
  className,
  onDateChange,
}: Props) => {
  const router = useRouter();
  const handleDateChange = (newDate: Date) =>
    router.push(`/archive/${format(newDate, DEFAULT_DATE_FORMAT)}`);

  const DateSelectBtn = forwardRef(function DateSelectBtn(
    { value, onClick }: DeleteSelectBtnProps,
    ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
  ) {
    return (
      <Button color={"primary"} onClick={onClick} ref={ref}>
        {value}
      </Button>
    );
  });

  return (
    <div className={classNames(className, "flex align-middle justify-center")}>
      <label>
        <span>Date: </span>
        <DatePicker
          selected={currentDate}
          onChange={handleDateChange}
          customInput={
            <DateSelectBtn
              value={"Delete"}
              onClick={() => console.log("Delete clicked")}
            />
          }
        />
      </label>
      <SearchInput className={"my-2"} placeholder={"Search"} />
    </div>
  );
};
