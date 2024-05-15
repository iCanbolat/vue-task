import { ActionContext, ActionTree } from "vuex";
import {
  RootActions,
  RootGetters,
  RootMutations,
  RootState,
} from ".";
import {
  createTaskService,
  deleteTaskService,
  fetchTasksService,
  updateTaskService,
} from "@/lib/api-services";
import { QueryParams, Task } from "@/types";
import { AxiosResponse } from "axios";

type AugmentedActionContext = {
  commit<K extends keyof RootMutations>(
    key: K,
    payload: Parameters<RootMutations[K]>[1]
  ): ReturnType<RootMutations[K]>;
  dispatch<K extends keyof RootActions>(
    key: K,
    payload: Parameters<RootActions[K]>[1]
  ): ReturnType<RootActions[K]>;
  getters: {
    [K in keyof RootGetters]: ReturnType<
      RootGetters[K]
    >;
  };
} & Omit<
  ActionContext<RootState, RootState>,
  "commit" | "dispatch" | "getters"
>;

export type Actions = {
  getTasks(
    context: AugmentedActionContext,
    filter: QueryParams
  ): void;
  addTask(
    context: AugmentedActionContext,
    task: Task
  ): void;
  deleteTask(
    context: AugmentedActionContext,
    todoId: number
  ): void;
  updateTask(
    context: AugmentedActionContext,
    task: Task | any
  ): void;
};

export const actions: ActionTree<
  RootState,
  RootState
> &
  Actions = {
  async getTasks(
    { commit },
    filter: QueryParams
  ) {
    try {
      const todos: Task[] =
        await fetchTasksService(filter);
      commit("setInitialTasks", todos);
    } catch (error) {
      console.log("action-error", error);
    }
  },
  async addTask(
    { commit },
    values: Partial<Task>
  ) {
    try {
      if (!values) return "No Values provided.";

      const response: AxiosResponse =
        await createTaskService(values);
      if (response?.status !== 200) {
        return response?.data;
      }

      delete values.id;
      //@ts-ignore
      commit("setNewTasks", values);
      commit("setDialog", null);
    } catch (error) {
      console.log("actions-create", error);
    }
  },
  async deleteTask({ commit }, todoId) {
    const response = await deleteTaskService(
      todoId
    );
    if (response?.status !== 200) return;
    commit("setDialog", null);
    commit("deleteTask", todoId);
    return todoId;
  },
  async updateTask({ commit }, task) {
    const response = await updateTaskService(
      task
    );
    commit('updateTask',task)
  },
};
