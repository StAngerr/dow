import { SearchPanel } from "../../SearchPanel/SearchPanel";
import { CurrentDate } from "../../../types";

interface Props {
  currentDate: CurrentDate;
  handleDateChange: (newDate: Date) => void;
}

export const SingleDaySearchPanel = ({
  currentDate,
  handleDateChange,
}: Props) => {
  return (
    <header className={"h-1/6"}>
      <SearchPanel
        className={"w-f"}
        currentDate={currentDate.date}
        onDateChange={handleDateChange}
      />
    </header>
  );
};
