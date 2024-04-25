// import { todos } from "@/lib/constants";
import { TestTodo } from "@/types";

export type State = {
  todos: TestTodo[];
  isOpen: boolean;
  todo: TestTodo | null;
};

export const state: State = {
  todos: [],
  isOpen: false,
  todo: null,
};
