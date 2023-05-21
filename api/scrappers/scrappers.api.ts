import { runNewTask as runNewTaskUrl } from "./scrappers.urls";

export const runNewTask = (from: string, to: string) => {
  const query = "?" + new URLSearchParams({ from, to });
  return fetch(runNewTaskUrl + query, { method: "get" }).then((res) =>
    res.json()
  );
};
