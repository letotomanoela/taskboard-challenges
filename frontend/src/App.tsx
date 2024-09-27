import Task from "./components/Task";
import AddTaskModal from "./modals/AddTaskModal";
import EditTaskModal from "./modals/EditTaskModal";
import Title from "./sections/Title";
import { useState, useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";

const App = () => {
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);

  const { isError, isLoading, isSuccess, tasks } = useContext(TaskContext);

  const toggleAddTaskModal = () => {
    setOpenAddTaskModal(!openAddTaskModal);
  };
  const toggleEditTaskModal = () => {
    setOpenEditTaskModal(!openEditTaskModal);
  };
  return (
    <main className="w-full relative px-6 md:px-0 min-h-screen flex items-center justify-center ">
      {isLoading && <img alt="loading" src="./rotate.gif" className="w-20" />}
      {!isLoading && isSuccess && (
        <div className="w-[640px] min-h-[300px]">
          <Title />

          <section className="mt-8 space-y-5">
            {tasks.map((item) => (
              <Task
                key={item.id}
                id={item.id}
                openModal={toggleEditTaskModal}
                status={item.status}
                title={item.name}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </section>
          <AddTaskButton onClick={toggleAddTaskModal} />
        </div>
      )}

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
