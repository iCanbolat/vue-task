import {
  TodoPriority,
  TodoStatus,
} from "./types";

export const formatString = (word: string) => {
  return (
    word.slice(0, 1).toLocaleUpperCase() +
    word.slice(1)
  );
};

export const getPriorityClassname = (
  priority: TodoPriority
) => {
  switch (priority) {
    case TodoPriority.HIGH:
      return "destructive";
    case TodoPriority.MEDIUM:
      return "medium";
    case TodoPriority.LOW:
      return "done";
    default:
      return "default";
  }
};
export const getStatusClassname = (
  status: TodoStatus
) => {
  switch (status) {
    case TodoStatus.DONE:
      return "done";
    case TodoStatus.INPROGRESS:
      return "inprogress";
    default:
      return "default";
  }
};
