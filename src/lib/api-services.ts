import { QueryParams, Task } from "@/types";
import axios from "axios";

export const fetchTasksService = async (
  queryParams: QueryParams
): Promise<Task[] | any> => {
  try {
    console.log("quer", queryParams);

    const params = new URLSearchParams();

    for (const [k, v] of Object.entries(
      queryParams
    )) {
      //@ts-ignore
      params.append(k, v);
    }

    const { priority } = queryParams;

    console.log(priority);

    const data = await axios
      .get<Task[]>(
        import.meta.env.VITE_API_URL + "ToDo",
        {
          params,
        }
      )
      .then((res) => res.data);
    console.log("fetchTasks", data);

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const createTaskService = async (
  values: Partial<Task>
): Promise<any> => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "ToDo",
      values
    );

    console.log("creatTaskRes", response);

    return response;
  } catch (error) {
    console.log("service-create-error", error);
  }
};

export const deleteTaskService = async (
  taskId: number
) => {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_API_URL +
        "ToDo/" +
        taskId
    );
    console.log("deleteTask", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateTaskService = async (
  values: Partial<Task>
) => {
  try {
    console.log('service-values',values);
    
    const response = await axios.put(
      import.meta.env.VITE_API_URL +
        "ToDo/" +
        values.id,
      values
    );
    console.log("updateTask", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
