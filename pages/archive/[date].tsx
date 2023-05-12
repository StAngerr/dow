import { DayCard } from "../../components/DayCard/DayCard";
import { SearchPanel } from "../../components/SearchPanel/SearchPanel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { Article, CurrentDate, QueryObj } from "../../types";
import { DEFAULT_DATE_FORMAT, TODAY } from "../../constants";
import { GetServerSideProps } from "next";
import { SingleDayPage } from "../../components/SingleDayPage/SingelDayPage";
import { SingleDaySearchPanel } from "../../components/SingleDayPage/SingleDaySearchPanel/SingleDaySearchPanel";
import { io } from "socket.io-client";

interface Props {
  data: Article[];
}
export default function SingleDayArchive({ data }: Props) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<CurrentDate>(TODAY);

  const handleDateChange = (newDate: Date) => {
    setCurrentDate({
      date: newDate,
      dateStr: format(newDate, DEFAULT_DATE_FORMAT),
    });
  };

  //TEST IO
  useEffect(() => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    window.test = socket;
    // socket.timeout(2000).emit("client-message", "Hello from client");
    console.log("socket", socket);
  }, []);

  useEffect(() => {
    const { date } = router.query as unknown as QueryObj;
    if (date && date.toLowerCase() === "today") {
      setCurrentDate(TODAY);
    } else {
      const routerDate: Date = new Date(date);
      setCurrentDate({
        date: routerDate,
        dateStr: format(routerDate, DEFAULT_DATE_FORMAT),
      });
    }
  }, [router.query]);

  return (
    <div className={"h-full w-full p-8 flex-col"}>
      <SingleDaySearchPanel
        currentDate={currentDate}
        handleDateChange={handleDateChange}
      />
      <SingleDayPage articles={data}></SingleDayPage>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedDate = new Date(context.query.date as string);
  if (!isValid(parsedDate)) {
    return { props: { data: context.query } };
  }
  const resp = await fetch(
    `http://localhost:3001/data/articles/${format(
      parsedDate,
      DEFAULT_DATE_FORMAT
    )}`
  );
  const articles = await resp.json();
  return {
    props: { data: articles }, // will be passed to the page component as props
  };
};
