import { createContext, ReactNode, useEffect, useState } from "react";

export const TaskContext = createContext({
  isLoading: false,
  isSuccess: false,
  isError: false,
  tasks: [] as Task[],
});

type Task = {
  id: string;
  name: string;
  description?: string;
  status: "TODO" | "WONTDO" | "PROGRESS" | "COMPLETED";
  icon: string;
};

export default function TaskContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      const result = await fetch("http://localhost:8000/api/task");
      const data: Task[] = await result.json();
      setTasks(data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        isError,
        isLoading,
        isSuccess,
        tasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
