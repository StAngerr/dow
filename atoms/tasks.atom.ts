import { atom } from "jotai";
import { Task } from "../types/tasks";

export const tasksAtom = atom<Task[]>([]);
