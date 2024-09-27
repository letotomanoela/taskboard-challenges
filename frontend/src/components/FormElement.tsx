type Props = {
  label: string;
  type: "text" | "number" | "date";
  category: "input" | "textarea" | "icon" | "status";
  name: string;
  placeholder?: string;
  dataIcons?: string[];
};
import clsx from "clsx";
import { useContext } from "react";
import { TaskContext, TaskForm } from "../contexts/TaskContext";

const FormElement = ({
  label,
  type,
  category,
  name,
  placeholder,
  dataIcons,
}: Props) => {
  const { formData, setFormData } = useContext(TaskContext);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm text-[#97A3B6]">
        {label}
      </label>
      {category === "input" && (
        <input
          type={type}
          id={name}
          value={formData[name as keyof typeof formData]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          placeholder={placeholder}
          className="w-full border border-[#97A3B6] p-2 rounded-lg outline-none pl-4 focus:ring-1 focus:ring-[#3662E3]"
        />
      )}
      {category === "textarea" && (
        <textarea
          id={name}
          value={formData[name as keyof typeof formData]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          placeholder={placeholder}
          className="w-full border resize-none h-40 border-[#97A3B6] p-2 rounded-lg outline-none pl-4 focus:ring-1 focus:ring-[#3662E3]"
        />
      )}
      {category === "icon" && (
        <div className="flex items-center flex-wrap gap-4">
          {dataIcons?.map((item) => (
            <div
              onClick={() => {
                setFormData({ ...formData, icon: item });
              }}
              key={item}
              className={clsx(
                "size-10 bg-[#E3E8EF] flex items-center justify-center rounded-lg",
                formData.icon === item && "ring-1 ring-[#3662E3]"
              )}
            >
              <img alt={item} src={item} className="w-7" />
            </div>
          ))}
        </div>
      )}

      {category === "status" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["PROGRESS", "COMPLETED", "WONTDO"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setFormData({
                  ...formData,
                  status:
                    item === formData.status
                      ? "TODO"
                      : (item as "TODO" | "WONTDO" | "PROGRESS" | "COMPLETED"),
                });
              }}
              className={clsx(
                "w-full border-2 flex relative  items-center space-x-3 rounded-xl p-1",
                formData.status === item && "ring-1 ring-[#3662E3]"
              )}
            >
              <div
                className={clsx(
                  "size-10 rounded-xl flex items-center justify-center",
                  item === "PROGRESS" && "bg-[#E9A23B]",
                  item === "COMPLETED" && "bg-[#32D657]",
                  item === "WONTDO" && "bg-[#DD524C]"
                )}
              >
                <img
                  src={clsx(
                    item === "COMPLETED" && "./Done_round_duotone.svg",
                    item === "WONTDO" && "./close_ring_duotone.svg",
                    item === "PROGRESS" && "./Time_atack_duotone.svg"
                  )}
                  className="icon"
                  alt="icon"
                />
              </div>
              <p>
                {item === "PROGRESS" && "In Progress"}
                {item === "WONTDO" && "Won't Do"}
                {item === "COMPLETED" && "Completed"}
              </p>
              <div
                className={clsx(
                  "size-6  absolute right-3 bg-[#3662E3] rounded-full flex items-center justify-center",
                  formData.status !== item && "opacity-0"
                )}
              >
                <img alt="icon" src="./Done_round.svg" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FormElement;
