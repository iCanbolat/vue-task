import { GetterTree } from "vuex";
import { RootGetters, RootState } from ".";
import { State } from "./state";
import { TestTodo } from "@/types";

type GettersParam = {
  [K in keyof RootGetters]: ReturnType<
    RootGetters[K]
  >;
};

export type Getters = {
  todoList(state: State): TestTodo[];
  dialogState(state: State): boolean;
  getTodo(state: State): TestTodo | null;
};

export const getters: GetterTree<
  State,
  RootState
> &
  Getters = {
  todoList(state) {
    const todos = state.todos;

    return todos;
  },
  dialogState(state) {
    return state.isOpen;
  },
  getTodo(state) {
    return state.todo;
  },
};
