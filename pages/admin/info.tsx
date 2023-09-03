import { Heading } from "../../components/common/Heading/Heading";
import Calendar, { CalendarTileProperties } from "react-calendar";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../constants";
import { JobsList } from "../../components/Admin/JobsList/JobsList";
import { NewScrapTaskForm } from "../../components/Admin/NewScrapTaskForm/NewScrapTaskForm";
import { runNewTask } from "../../api/scrappers/scrappers.api";
import { rootUrl } from "../../api";
import { Task } from "../../types/tasks";
import { useAtom } from "jotai";
import { tasksAtom } from "../../atoms/tasks.atom";
import SocketWrap from "../../socket";
import { Socket } from "socket.io-client";
import { articlesAtom } from "../../atoms/articles.atom";
import { Tab, Tabs } from "../../components/common/Tabs/Tabs";
import { DataProcessing } from "../../components/Admin/DataProcessing/DataProcessing";

interface Props {
  days: string[];
  stats: {
    totalDays: number;
    totalFilledDays: number;
  };
}
export const AdminInfo = ({ days, stats }: Props) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [, setDays] = useAtom(articlesAtom);
  const [currentView, setCurrentView] = useState("1");
  const subscription = useRef<Socket | null>(null);

  const tileDisabled = ({ date, view }) => {
    // Disable clicking on articles
    return view === "month" && date.getDate() !== new Date().getDate();
  };

  const handleRunNewTask = useCallback(
    (start: string, end: string) => {
      runNewTask(start, end).then((newTask: Task) =>
        setTasks([...tasks, newTask])
      );
    },
    [tasks, setTasks]
  );

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (view === "month" && days.includes(format(date, DEFAULT_DATE_FORMAT))) {
      return "!bg-green-500";
    }
  };

  const handleWSMessage = useCallback(
    (msg: string, data: string) => {
      switch (msg) {
        case "scrapping-success":
          setTasks(
            tasks.map((i) => (i.id === data ? { ...i, status: "success" } : i))
          );
          break;

        case "scrapping-failed":
          setTasks(
            tasks.map((i) => (i.id === data ? { ...i, status: "failed" } : i))
          );
          break;

        default:
          return;
      }
    },
    [tasks, setTasks]
  );

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "1",
        label: "Info",
      },
      {
        id: "2",
        label: "Collector",
      },
      {
        id: "3",
        label: "Process",
      },
    ],
    []
  );

  const currentTabContent = useMemo(() => {
    switch (currentView) {
      case "1":
        return (
          <>
            <Heading level={"2"}>Current day</Heading>
            <p>{format(new Date(), "dd LLLL yyyy")}</p>
            <Heading level={"2"}>Loaded days:</Heading>
            <p>{`${stats.totalFilledDays} out of ${stats.totalDays}`}</p>
          </>
        );
      case "2":
        return (
          <>
            <Calendar
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
            />
            <NewScrapTaskForm onCreateNewTask={handleRunNewTask} />
            <JobsList key={"jobs-list"} />
          </>
        );
      case "3":
        return <DataProcessing />;
      default:
        return null;
    }
  }, [stats, tileDisabled, tileClassName, handleRunNewTask]);

  useEffect(() => {
    // TODO: why unmount here
    console.log("Admin root mount");
    return () => console.log("Admin root unmount");
  }, []);

  useEffect(() => setDays(days), [days]);

  useEffect(() => {
    if (!subscription.current) {
      subscription.current = SocketWrap.getInstance()?.onAny((msg, data) =>
        handleWSMessage(msg, data)
      );
    }

    return () => {
      if (subscription.current) {
        subscription.current.offAny();
        subscription.current = null;
      }
    };
  }, [handleWSMessage, subscription.current]);

  return (
    <div className={"p-5 h-full flex flex-col"}>
      <Tabs onChange={setCurrentView} tabs={tabs} />
      {currentTabContent}
    </div>
  );
};

export const getServerSideProps = async () => {
  const statsResp: Response = await fetch(`${rootUrl}/scrappers/days/stats`);
  const daysResp = await fetch(`${rootUrl}/scrappers/days`);
  const stats = await statsResp.json();
  const days = await daysResp.json();
  return {
    props: {
      stats,
      days,
    },
  };
};

export default AdminInfo;
