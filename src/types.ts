interface Todo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}
export type TodoState = {
  todos: Todo[];
};

export interface Task {
  id: number;
  title: string;
  content: string;
  isComplete: TodoStatus;
  priority: TodoPriority;
}

export interface TestTodo {
  title: string;
  id: string;
  status: TodoStatus;
  label: string;
  priority: string;
}
export enum TodoStatus {
  DONE = "COMPLETED",
  INPROGRESS = "BEING",
  TODO = "STARTED",
}
export enum TodoPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export type QueryParams = {
  isComplete?: TodoStatus[];
  priority?: TodoPriority[];
};
