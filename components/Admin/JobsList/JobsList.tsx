import { useEffect, useState } from "react";
import { allTasks } from "../../../api/scrappers/scrappers.urls";
import { Task, TaskStatus } from "../../../types/tasks";

const statusColors: { [key in TaskStatus]: string } = {
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
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto mt-2.5">
        <thead>
          <tr className="text-left bg-accent1 ">{columns}</tr>
        </thead>
        <tbody className={"bg-bg2"}>
          {tasks.map((task: Task) => (
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
                {new Date(task.startedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
