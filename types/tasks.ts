export type TaskStatus = "success" | "failed" | "in progress";
export interface Task {
  from: string;
  id: string;
  startedAt: string;
  status: TaskStatus;
  to: string;
}
