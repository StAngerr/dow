import { Button } from "../../common/Button/Button";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../../common/Modal/Modal";
import Calendar, { CalendarTileProperties } from "react-calendar";
import { Heading } from "../../common/Heading/Heading";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../../constants";

interface Props {
  onCreateNewTask: (from: string, to: string) => void;
}

export const NewScrapTaskForm = ({ onCreateNewTask }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleDateChange = useCallback((d) => {
    setSelectedRange(d);
  }, []);

  const tileClassName = useCallback(
    ({ date }: CalendarTileProperties) => {
      console.log(selectedRange);
      return selectedRange &&
        date >= selectedRange[0] &&
        date <= selectedRange[1]
        ? "bg-primary text-white"
        : "";
    },
    [selectedRange]
  );

  const handleCreateNewTask = useCallback(() => {
    if (selectedRange) {
      onCreateNewTask(
        format(selectedRange[0], DEFAULT_DATE_FORMAT),
        format(selectedRange[1], DEFAULT_DATE_FORMAT)
      );
    }
  }, [onCreateNewTask]);

  const createNewTaskForm = useMemo(() => {
    return (
      <Modal className={"px-16 py-12"} onClose={() => setIsOpened(false)}>
        <div>
          <Heading className={"mb-3"} level={"3"}>
            Select range to scrap
          </Heading>

          <p className={"mb-7"}>{`Selected date from ${
            selectedRange ? format(selectedRange[0], DEFAULT_DATE_FORMAT) : "-"
          } to ${
            selectedRange ? format(selectedRange[1], DEFAULT_DATE_FORMAT) : "-"
          }`}</p>

          <Calendar
            className={"mb-7"}
            tileClassName={tileClassName}
            selectRange
            onChange={handleDateChange}
          />

          <div>
            <Button type={"secondary"} onClick={() => setIsOpened(false)}>
              Cancel
            </Button>
            <Button
              disabled={!selectedRange}
              type={"primary"}
              onClick={handleCreateNewTask}
            >
              Run
            </Button>
          </div>
        </div>
      </Modal>
    );
  }, [onCreateNewTask, tileClassName, handleDateChange]);

  return (
    <>
      {isOpened && createNewTaskForm}
      <Button type={"primary"} onClick={() => setIsOpened(true)}>
        Collect data
      </Button>
    </>
  );
};
