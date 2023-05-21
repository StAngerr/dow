import { useEffect, useState } from "react";
import { allTasks } from "../../../api/scrappers/scrappers.urls";

const taskData = [
  {
    id: 1,
    from: "2022-05-15",
    to: "2022-05-20",
    status: "in progress",
    startedDate: "2022-05-15",
  },
  {
    id: 2,
    from: "2022-05-12",
    to: "2022-05-14",
    status: "failed",
    startedDate: "2022-05-12",
  },
  {
    id: 3,
    from: "2022-05-21",
    to: "2022-05-24",
    status: "success",
    startedDate: "2022-05-21",
  },
];

const statusColors = {
  "in progress": "text-blue-400",
  failed: "text-red-300",
  success: "text-green-500",
};

const columnsConfig = [
  {
    label: "Task ID",
  },
  {
    label: "Range from",
  },
  {
    label: "Range to",
  },
  { label: "Status" },
  { label: "Task started date" },
];

export const JobsList = () => {
  const [tasks, setTasks] = useState([]);

  const columns = columnsConfig.map((column) => (
    <th key={column.label} className="p-2 font-bold  text-text">
      {column.label}
    </th>
  ));

  useEffect(() => {
    fetch(allTasks).then((res) => {
      res.json().then((data) => {
        setTasks(data);
      });
    });
  }, []);

  console.log(tasks);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto mt-2.5">
        <thead>
          <tr className="text-left bg-accent1 ">{columns}</tr>
        </thead>
        <tbody className={"bg-bg2"}>
          {taskData.map((task) => (
            <tr key={task.id}>
              <td className="p-2">{task.id}</td>
              <td className="p-2">
                {new Date(task.from).toLocaleDateString()}
              </td>
              <td className="p-2">{new Date(task.to).toLocaleDateString()}</td>
              <td
                className={`p-2 font-bold align-middle ${
                  statusColors[task.status]
                } text-white`}
              >
                {task.status}
              </td>
              <td className="p-2">
                {new Date(task.startedDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
