import { MutationTree } from "vuex";
import { State } from "./state";
import { TestTodo } from "@/types";

export type Mutations = {
  addTodo(state: State, payload: TestTodo): void;
  setDialog(
    state: State,
    payload: TestTodo | null
  ): void;
};

export const mutations: MutationTree<State> &
  Mutations = {
  addTodo(state, payload) {
    state.todos = [...state.todos, payload];
  },
  setDialog(state, payload) {
    state.isOpen = !state.isOpen;
    if (payload !== null) {
      state.todo = payload;
    } else {
      state.todo = null;
    }
  },
};
