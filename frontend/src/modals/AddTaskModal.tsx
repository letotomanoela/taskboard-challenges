import Modal from "../components/Modal";
import FormElement from "../components/FormElement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/task.api";
const icons: string[] = [
  "./gif/angry.gif",
  "./gif/angry1.gif",
  "./gif/bored.gif",
  "./gif/cry.gif",
  "./gif/surprised.gif",
  "./gif/sad.gif",
];

const myTask = {
  name: "Task 2",
  description: "This is a task",
  status: "COMPLETED",
  icon: "./gif/angry.gif",
};
const AddTaskModal = ({ closeModal }: { closeModal: () => void }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
  });

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
      <button
        onClick={() => {
          mutateAsync(myTask);
        }}
        className="px-10 py-2 absolute bottom-3 right-2 rounded-full text-white bg-[#3662E3]"
      >
        Add
      </button>
    </Modal>
  );
};
export default AddTaskModal;
