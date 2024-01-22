import { useEffect, useMemo } from "react";
import { allTasks } from "../../../api/scrappers/scrappers.urls";
import { Task, TaskStatus } from "../../../types/tasks";
import { useAtom } from "jotai";
import { tasksAtom } from "../../../atoms/tasks.atom";

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
  { label: "Task created date" },
];

export const JobsList = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const columns = columnsConfig.map((column) => (
    <th key={column.label} className="p-2 font-bold  text-text">
      {column.label}
    </th>
  ));

  const renderRows = useMemo(
    () =>
      tasks
        .sort(
          (taskA, taskB) =>
            new Date(taskB.startedAt).valueOf() -
            new Date(taskA.startedAt).valueOf()
        )
        .map((task: Task) => (
          <tr key={task.id}>
            <td className="p-2">{task.id}</td>
            <td className="p-2">{new Date(task.from).toLocaleDateString()}</td>
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
        )),
    [tasks]
  );

  useEffect(() => {
    fetch(allTasks).then((res) => {
      res.json().then((data) => {
        setTasks(data);
      });
    });
  }, []);

  return (
    <div className="w-full overflow-x-auto max-h-96">
      <table className="w-full table-auto mt-2.5">
        <thead>
          <tr className="text-left bg-accent1 ">{columns}</tr>
        </thead>
        <tbody className={"bg-bg2"}>{renderRows}</tbody>
      </table>
    </div>
  );
};
