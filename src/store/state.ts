// import { todos } from "@/lib/constants";
import { Task, TestTodo } from "@/types";

export type State = {
  todos: Task[];
  isOpen: boolean;
  todo: Task | null;
};

export const state: State = {
  todos: [],
  isOpen: false,
  todo: null,
};
