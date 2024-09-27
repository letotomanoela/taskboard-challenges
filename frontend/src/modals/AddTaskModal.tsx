import Modal from "../components/Modal";
import FormElement from "../components/FormElement";
import { useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";

const icons: string[] = [
  "./gif/angry.gif",
  "./gif/angry1.gif",
  "./gif/bored.gif",
  "./gif/cry.gif",
  "./gif/surprised.gif",
  "./gif/sad.gif",
];

const AddTaskModal = ({ closeModal }: { closeModal: () => void }) => {
  const { isLoadingAdd, isSuccessAdd, isErrorAdd, addTask } =
    useContext(TaskContext);

  useEffect(() => {
    if (isSuccessAdd) {
      closeModal();
    }
  }, [isSuccessAdd]);
  return (
    <Modal>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Task details</h1>
        <div
          onClick={closeModal}
          className="size-10 border-2 rounded-xl cursor-pointer flex items-center justify-center"
        >
          <img src="./close_ring_duotone-1.svg" className="w-7" alt="" />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-8 space-y-4"
      >
        <FormElement
          label="Task name"
          type="text"
          category="input"
          name="name"
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
          name="icon"
        />
        <FormElement
          name="status"
          label="Status"
          type="text"
          category="status"
        />
      </form>
      <button
        disabled={isLoadingAdd}
        onClick={addTask}
        className="px-10 py-2 absolute bottom-3 right-2 rounded-full text-white bg-[#3662E3]"
      >
        {isLoadingAdd ? "Adding ..." : "Add"}
      </button>
    </Modal>
  );
};
export default AddTaskModal;
