import Task from "./components/Task";
import Title from "./sections/Title";
import Modal from "./components/Modal";
import FormElement from "./components/FormElement";

const icons: string[] = [
  "./gif/angry.gif",
  "./gif/angry1.gif",
  "./gif/bored.gif",
  "./gif/cry.gif",
  "./gif/surprised.gif",
  "./gif/sad.gif",
];

const App = () => {
  return (
    <main className="w-full relative px-6 md:px-0 min-h-screen flex items-center justify-center ">
      <div className="w-[640px] min-h-[300px]">
        <Title />

        <section className="mt-8 space-y-5">
          <Task status="PROGRESS" title="Task 1" icon="./gif/angry.gif" />
          <Task status="TODO" title="Task 2" icon="./gif/angry1.gif" />
          <Task status="WONTDO" title="Task 3" icon="./gif/sad.gif" />
          <Task status="COMPLETED" title="Task 4" icon="./gif/bored.gif" />
        </section>
        <AddTaskButton />
      </div>

      <Modal>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Task details</h1>
          <div className="size-10 border-2 rounded-xl flex items-center justify-center">
            <img src="./close_ring_duotone-1.svg" className="w-7" alt="" />
          </div>
        </div>
        <form className="mt-8 space-y-4">
          <FormElement
            label="Task name"
            type="text"
            category="input"
            name="title"
          />
          <FormElement
            label="Description"
            type="text"
            category="textarea"
            placeholder="Enter a short description"
            name="description"
          />
          <FormElement
            label="Icon"
            type="text"
            category="icon"
            dataIcons={icons}
          />
          <FormElement label="Status" type="text" category="status" />
        </form>
      </Modal>
    </main>
  );
};
export default App;

const AddTaskButton = () => {
  return (
    <div className="w-full mt-5 bg-[#F5E8D5] flex items-center px-4  h-16 rounded-xl space-x-3 cursor-pointer">
      <div className="size-10 rounded-xl flex items-center justify-center  bg-[#E9A23B]">
        <img src="./Add_round_duotone.svg" className="icon" alt="" />
      </div>
      <p className="font-semibold">Add Task</p>
    </div>
  );
};
