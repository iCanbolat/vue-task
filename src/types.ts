interface Todo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}
export type TodoState = {
  todos: Todo[];
};

export interface TestTodo {
  title: string;
  id: string;
  status: TodoStatus;
  label: string;
  priority: string;
}
export enum TodoStatus {
  DONE = "done",
  INPROGRESS = "in progress",
  TODO = "todo"
}
export enum TodoPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
