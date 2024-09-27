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

const EditTaskModal = ({ closeModal }: { closeModal: () => void }) => {
  const {
    isLoadingEditDelete,
    isSuccessEditDelete,
    deleteTask,
    setSelectionnedId,
  } = useContext(TaskContext);

  useEffect(() => {
    if (isSuccessEditDelete) {
      closeModal();
    }
  }, [isSuccessEditDelete]);

  return (
    <Modal>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Task details</h1>
        <div
          onClick={() => {
            closeModal();
            setSelectionnedId("");
          }}
          className="size-10 border-2 cursor-pointer rounded-xl flex items-center justify-center"
        >
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
          name="icon"
          dataIcons={icons}
        />
        <FormElement
          label="Status"
          type="text"
          category="status"
          name="status"
        />
      </form>
      <div className="w-full  space-x-2 flex items-center justify-end">
        <button
          disabled={isLoadingEditDelete}
          onClick={deleteTask}
          className="px-10 py-2 flex items-center space-x-3  rounded-full text-white bg-[#97A3B6]"
        >
          <span className="text-base">
            {isLoadingEditDelete ? "Deleting...." : "Delete"}
          </span>
          <img src="./Trash.svg" className="icon" alt="" />
        </button>
        <button
          disabled={isLoadingEditDelete}
          className="px-10 py-2 flex items-center space-x-3  rounded-full text-white bg-[#3662E3]"
        >
          <span className="text-base">
            {isLoadingEditDelete ? "Saving...." : "Save"}
          </span>
          <img src="./Done_round.svg" className="icon" alt="" />
        </button>
      </div>
    </Modal>
  );
};
export default EditTaskModal;
