import { Heading } from "../../components/common/Heading/Heading";
import DatePicker from "react-datepicker";
import Calendar, { CalendarTileProperties } from "react-calendar";
import React, { useCallback } from "react";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../constants";
import { JobsList } from "../../components/Admin/JobsList/JobsList";
import { NewScrapTaskForm } from "../../components/Admin/NewScrapTaskForm/NewScrapTaskForm";
import { runNewTask } from "../../api/scrappers/scrappers.api";

interface Props {
  days: string[];
  stats: {
    totalDays: number;
    totalFilledDays: number;
  };
}
export const AdminRoot = ({ days, stats }: Props) => {
  const tileDisabled = ({ activeStartDate, date, view }) => {
    // Disable clicking on days
    return view === "month" && date.getDate() !== new Date().getDate();
  };

  const handleRunNewTask = useCallback((start: string, end: string) => {
    runNewTask(start, end);
  }, []);

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    console.log(
      format(date, DEFAULT_DATE_FORMAT),
      days.includes(format(date, DEFAULT_DATE_FORMAT))
    );
    if (view === "month" && days.includes(format(date, DEFAULT_DATE_FORMAT))) {
      return "!bg-green-500";
    }
  };

  return (
    <div className={"p-5"}>
      <Heading level={"2"}>Current day</Heading>
      <p>{format(new Date(), "dd LLLL yyyy")}</p>
      <Heading level={"2"}>Loaded days:</Heading>
      <p>{`${stats.totalFilledDays} out of ${stats.totalDays}`}</p>
      <Calendar tileDisabled={tileDisabled} tileClassName={tileClassName} />
      <NewScrapTaskForm onCreateNewTask={handleRunNewTask} />
      <JobsList />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const statsResp: Response = await fetch(
    "http://localhost:3001/scrappers/days/stats"
  );
  const daysResp = await fetch("http://localhost:3001/scrappers/days");
  const stats = await statsResp.json();
  const days = await daysResp.json();
  return {
    props: {
      stats,
      days,
    },
  };
};

export default AdminRoot;
