import Task from "./components/Task";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import Title from "./sections/Title";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./api/task.api";

const App = () => {
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["task"],
    queryFn: getTasks,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  const toggleAddTaskModal = () => {
    setOpenAddTaskModal(!openAddTaskModal);
  };
  const toggleEditTaskModal = () => {
    setOpenEditTaskModal(!openEditTaskModal);
  };
  return (
    <main className="w-full relative px-6 md:px-0 min-h-screen flex items-center justify-center ">
      <div className="w-[640px] min-h-[300px]">
        <Title />

        <section className="mt-8 space-y-5">
          <Task
            openModal={toggleEditTaskModal}
            status="PROGRESS"
            title="Task 1"
            icon="./gif/angry.gif"
          />
          <Task
            openModal={toggleEditTaskModal}
            status="TODO"
            title="Task 2"
            icon="./gif/angry1.gif"
          />
          <Task
            openModal={toggleEditTaskModal}
            status="WONTDO"
            title="Task 3"
            icon="./gif/sad.gif"
          />
          <Task
            openModal={toggleEditTaskModal}
            status="COMPLETED"
            title="Task 4"
            icon="./gif/bored.gif"
          />
        </section>
        <AddTaskButton onClick={toggleAddTaskModal} />
      </div>

      {openEditTaskModal && <EditTaskModal closeModal={toggleEditTaskModal} />}
      {openAddTaskModal && <AddTaskModal closeModal={toggleAddTaskModal} />}
    </main>
  );
};
export default App;

const AddTaskButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="w-full mt-5 bg-[#F5E8D5] flex items-center px-4  h-16 rounded-xl space-x-3 cursor-pointer"
    >
      <div className="size-10 rounded-xl flex items-center justify-center  bg-[#E9A23B]">
        <img src="./Add_round_duotone.svg" className="icon" alt="" />
      </div>
      <p className="font-semibold">Add Task</p>
    </div>
  );
};
