export const getTasks = async () => {
  const res = await fetch("/api/task");
  const dataJson = await res.json();
  return dataJson;
};

type Task = {
  name: string;
  description: string;
  status: string;
  icon: string;
};
export const createTask = async (data: Task) => {
  const res = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataJson = await res.json();
  return dataJson;
};
