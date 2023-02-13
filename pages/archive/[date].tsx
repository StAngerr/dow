import { DayCard } from "../../components/DayCard/DayCard";
import { SearchPanel } from "../../components/SearchPanel/SearchPanel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CurrentDate, QueryObj } from "../../types";
import { DEFAULT_DATE_FORMAT, TODAY } from "../../constants";

interface Props {
  data: any;
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

  useEffect(() => {
    const { date } = router.query as unknown as QueryObj;
    if (date && date.toLowerCase() === "today") {
      setCurrentDate(TODAY);
    }
  }, [router.query]);

  console.log(data);
  return (
    <div className={"h-full w-full p-8 flex-col"}>
      <h3>Current {currentDate.dateStr}</h3>
      <SearchPanel
        className={"w-f"}
        currentDate={currentDate.date}
        onDateChange={handleDateChange}
      />
      <DayCard currentDate={currentDate.date}></DayCard>
    </div>
  );
}

export async function getServerSideProps(context) {
  const date = "1-9-2023" || context.query.date;
  const resp = await fetch(`http://localhost:3001/data/articles/${date}`);
  const articles = await resp.json();
  return {
    props: { data: articles }, // will be passed to the page component as props
  };
}
