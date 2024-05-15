import { MutationTree } from "vuex";
import { State } from "./state";
import { Task } from "@/types";

export type Mutations = {
  setNewTasks(state: State, payload: Task): void;
  setDialog(
    state: State,
    payload: Task | null
  ): void;
  setInitialTasks(
    state: State,
    payload: Task[]
  ): void;
  deleteTask(state: State, payload: number): void;
  updateTask(state: State, payload: Task): void;
};

export const mutations: MutationTree<State> &
  Mutations = {
  setNewTasks(state, payload) {
    state.todos = [...state.todos, payload];
  },
  setInitialTasks(state, payload) {
    state.todos = payload;
  },
  setDialog(state, payload) {
    state.isOpen = !state.isOpen;
    if (payload !== null) {
      state.todo = payload;
    } else {
      state.todo = null;
    }
  },
  deleteTask(state, payload) {
    state.todos = state.todos.filter(
      (todo) => todo.id !== payload
    );
  },
  updateTask(state, payload) {
    const updatedArray = state.todos.filter(
      (task) => task.id !== payload.id
    );
    updatedArray.push(payload);

    state.todos = updatedArray;
    state.isOpen = !state.isOpen;
  },
};
