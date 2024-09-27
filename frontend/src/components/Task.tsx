import clsx from "clsx";

type Props = {
  status: "PROGRESS" | "TODO" | "WONTDO" | "COMPLETED";
  title: string;
  description?: string;
  icon?: string;
  openModal: () => void;
};

const Task = ({ status, title, description, icon, openModal }: Props) => {
  return (
    <div
      onClick={openModal}
      className={clsx(
        "w-full min-h-16 cursor-pointer    rounded-2xl grid grid-cols-[40px,1fr,40px]  px-4",
        status === "PROGRESS" && "bg-[#F5D565]",
        status === "COMPLETED" && "bg-[#A0ECB1]",
        status === "WONTDO" && "bg-[#F7D4D3]",
        status === "TODO" && "bg-[#E3E8EF]",
        description ? "items-start pt-2" : "items-center"
      )}
    >
      <div className="size-10 flex items-center justify-center bg-white rounded-xl">
        <img src={icon} className="w-8" alt="" />
      </div>
      <div className="text-black  text-lg pl-3">
        <p className="font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div
        className={clsx(
          "size-10 bg-white rounded-xl flex items-center justify-center",

          status === "TODO" && "opacity-0",
          status === "PROGRESS" && "bg-[#E9A23B]",
          status === "COMPLETED" && "bg-[#32D657]",
          status === "WONTDO" && "bg-[#DD524C]"
        )}
      >
        <img
          src={clsx(
            status === "COMPLETED" && "./Done_round_duotone.svg",
            status === "WONTDO" && "./close_ring_duotone.svg",
            status === "PROGRESS" && "./Time_atack_duotone.svg"
          )}
          className="icon"
          alt="icon"
        />
      </div>
    </div>
  );
};
export default Task;
