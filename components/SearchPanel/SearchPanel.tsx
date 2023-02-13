import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Button } from "../common/Button/Button";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../constants";

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}
export const SearchPanel = ({
  currentDate,
  className,
  onDateChange,
}: Props) => {
  const router = useRouter();
  const handleDateChange = (newDate: Date) => {
    router.push(`/archive/${format(newDate, DEFAULT_DATE_FORMAT)}`);
  };

  const DateSelectBtn = forwardRef(({ value, onClick }, ref) => (
    <Button
      type={"primary"}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </Button>
  ));

  return (
    <div className={className}>
      <DatePicker
        selected={currentDate}
        onChange={handleDateChange}
        customInput={<DateSelectBtn />}
      />
    </div>
  );
};
