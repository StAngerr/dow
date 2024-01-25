import { Button } from "../../common/Button/Button";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../../common/Modal/Modal";
import Calendar, { CalendarTileProperties } from "react-calendar";
import { Heading } from "../../common/Heading/Heading";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../../constants";
import { useAtom } from "jotai";
import { daysAtom } from "../../../atoms/daysAtom";
import classNames from "classnames";

interface Props {
  onCreateNewTask: (from: string, to: string) => void;
}

export const NewScrapTaskForm = ({ onCreateNewTask }: Props) => {
  const [days] = useAtom(daysAtom);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const handleDateChange = useCallback((values: [Date] | [Date, Date]) => {
    setSelectedRange(values as [Date, Date]);
  }, []);

  const tileClassName = useCallback(
    ({ date }: CalendarTileProperties) => {
      const activeClassName = days.includes(format(date, DEFAULT_DATE_FORMAT))
        ? "!bg-green-500"
        : "";
      const selectedClassName =
        selectedRange && date >= selectedRange[0] && date <= selectedRange[1]
          ? "bg-primary text-white"
          : "";

      return classNames(activeClassName, selectedClassName);
    },
    [selectedRange, days]
  );

  const handleCreateNewTask = useCallback(() => {
    if (selectedRange) {
      onCreateNewTask(
        format(selectedRange[0], DEFAULT_DATE_FORMAT),
        format(selectedRange[1], DEFAULT_DATE_FORMAT)
      );
      setIsOpened(false);
    }
  }, [onCreateNewTask, selectedRange]);

  const createNewTaskForm = useMemo(() => {
    const selectedFrom = selectedRange
      ? format(selectedRange[0], DEFAULT_DATE_FORMAT)
      : "-";
    const selectedTo = selectedRange
      ? format(selectedRange[1], DEFAULT_DATE_FORMAT)
      : "-";
    return (
      <div>
        <Heading className={"mb-3"} level={"3"}>
          Select range to scrap
        </Heading>

        <p className={"mb-7"}>
          Selected date from <b>{selectedFrom}</b> to <b>{selectedTo}</b>
        </p>

        <Calendar
          tileClassName={tileClassName}
          selectRange
          onChange={handleDateChange}
          value={selectedRange}
        />
        <Button
          className={"block mb-7"}
          color={"link"}
          disabled={!selectedRange}
          onClick={() => setSelectedRange(null)}
        >
          Clear selection
        </Button>
        <div className={"flex justify-between"}>
          <Button color={"secondary"} onClick={() => setIsOpened(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedRange}
            color={"primary"}
            onClick={handleCreateNewTask}
          >
            Run
          </Button>
        </div>
      </div>
    );
  }, [onCreateNewTask, tileClassName, handleDateChange, selectedRange]);

  return (
    <>
      {isOpened && (
        <Modal className={"px-16 py-12"} onClose={() => setIsOpened(false)}>
          {createNewTaskForm}
        </Modal>
      )}
      <Button color={"primary"} onClick={() => setIsOpened(true)}>
        Collect data
      </Button>
    </>
  );
};
