import { createContext, ReactNode, useEffect, useState } from "react";

export const TaskContext = createContext({
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLoadingAdd: false,
  isSuccessAdd: false,
  isErrorAdd: false,
  isLoadingEditDelete: false,
  isSuccessEditDelete: false,
  isErrorEditDelete: false,
  tasks: [] as Task[],
  formData: {} as TaskForm,
  setFormData: (body: TaskForm) => {},
  addTask: () => {},
  deleteTask: () => {},
  selectionnedId: "",
  setSelectionnedId: (str: string) => {},
  updateTask: () => {},
});

type Task = {
  id: string;
  name: string;
  description?: string;
  status: "TODO" | "WONTDO" | "PROGRESS" | "COMPLETED";
  icon: string;
};

export interface TaskForm {
  name: string;
  description?: string;
  status: "TODO" | "WONTDO" | "PROGRESS" | "COMPLETED";
  icon: string;
}

const API: string = "http://localhost:8000/api/task";

export default function TaskContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isErrorAdd, setIsErrorAdd] = useState(false);
  const [isSuccessAdd, setIsSuccessAdd] = useState(false);
  const [isLoadingEditDelete, setIsLoadingEditDelete] = useState(false);
  const [isErrorEditDelete, setIsErrorEditDelete] = useState(false);
  const [isSuccessEditDelete, setIsSuccessEditDelete] = useState(false);
  const [selectionnedId, setSelectionnedId] = useState<string>("");

  const [formData, setFormData] = useState<TaskForm>({
    name: "",
    description: "",
    status: "TODO",
    icon: "",
  });

  const getTasks = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      const result = await fetch(API);
      const data: Task[] = await result.json();
      setTasks(data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const addTask = async () => {
    try {
      setIsLoadingAdd(true);
      setIsErrorAdd(false);
      setIsSuccessAdd(false);
      const result = await fetch(API, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await result.json();
      setIsLoadingAdd(false);
      setIsSuccessAdd(true);
      getTasks();
      setTimeout(() => {
        setIsSuccessAdd(false);
      }, 1000);
    } catch (error) {
      setIsLoadingAdd(false);
      setIsErrorAdd(true);
    }
  };

  const deleteTask = async () => {
    try {
      setIsLoadingEditDelete(true);
      setIsErrorEditDelete(false);
      setIsSuccessEditDelete(false);
      const result = await fetch(`${API}/${selectionnedId}`, {
        method: "DELETE",
      });
      const data = await result.json();
      setIsLoadingEditDelete(false);
      setIsSuccessEditDelete(true);
      setTimeout(() => {
        setIsSuccessEditDelete(false);
      }, 1000);
      getTasks();
    } catch (error) {
      setIsLoadingEditDelete(false);
      setIsErrorEditDelete(true);
    }
  };
  const updateTask = async () => {
    try {
      setIsLoadingEditDelete(true);
      setIsErrorEditDelete(false);
      setIsSuccessEditDelete(false);
      const result = await fetch(`${API}/${selectionnedId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await result.json();
      setIsLoadingEditDelete(false);
      setIsSuccessEditDelete(true);
      setTimeout(() => {
        setIsSuccessEditDelete(false);
      }, 1000);
      getTasks();
    } catch (error) {
      setIsLoadingEditDelete(false);
      setIsErrorEditDelete(true);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const getTaskById = async () => {
      try {
        const result = await fetch(`${API}/${selectionnedId}`);
        const data: Task = await result.json();
        console.log(data.name);
        setFormData({
          name: data.name,
          description: data.description,
          icon: data.icon,
          status: data.status,
        });
      } catch (error) {}
    };
    if (selectionnedId !== "") getTaskById();
  }, [selectionnedId]);

  return (
    <TaskContext.Provider
      value={{
        isError,
        isLoading,
        isSuccess,
        isErrorAdd,
        isLoadingAdd,
        isSuccessAdd,
        isErrorEditDelete,
        isLoadingEditDelete,
        isSuccessEditDelete,
        tasks,
        formData,
        setFormData,
        addTask,
        deleteTask,
        selectionnedId,
        setSelectionnedId,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
