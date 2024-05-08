import { GetterTree } from "vuex";
import { RootGetters, RootState } from ".";
import { State } from "./state";
import { Task, TestTodo } from "@/types";

type GettersParam = {
  [K in keyof RootGetters]: ReturnType<
    RootGetters[K]
  >;
};

export type Getters = {
  taskList(state: State): Task[];
  isDialogOpen(state: State): boolean;
  getTask(state: State): Task | null;
};

export const getters: GetterTree<
  State,
  RootState
> &
  Getters = {
  taskList(state) {
    return state.todos;
  },
  isDialogOpen(state) {
    return state.isOpen;
  },
  getTask(state) {
    return state.todo;
  },
};
