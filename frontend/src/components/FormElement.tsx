type Props = {
  label: string;
  type: "text" | "number" | "date";
  category: "input" | "textarea" | "icon" | "status";
  name?: string;
  placeholder?: string;
  dataIcons?: string[];
};
import clsx from "clsx";

const FormElement = ({
  label,
  type,
  category,
  name,
  placeholder,
  dataIcons,
}: Props) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm text-[#97A3B6]">
        {label}
      </label>
      {category === "input" && (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full border border-[#97A3B6] p-2 rounded-lg outline-none pl-4 focus:ring-1 focus:ring-[#3662E3]"
        />
      )}
      {category === "textarea" && (
        <textarea
          id={name}
          placeholder={placeholder}
          className="w-full border resize-none h-40 border-[#97A3B6] p-2 rounded-lg outline-none pl-4 focus:ring-1 focus:ring-[#3662E3]"
        />
      )}
      {category === "icon" && (
        <div className="flex items-center space-x-4">
          {dataIcons?.map((item) => (
            <div className="size-10 bg-[#E3E8EF] flex items-center justify-center rounded-lg">
              <img key={item} alt={item} src={item} className="w-7 " />
            </div>
          ))}
        </div>
      )}

      {category === "status" && (
        <div className="grid grid-cols-2 gap-3">
          {["PROGRESS", "COMPLETED", "WONTDO"].map((item) => (
            <div
              key={item}
              className="w-full border-2 flex items-center space-x-3 rounded-xl p-1 "
            >
              <div
                className={clsx(
                  "size-10  rounded-xl flex items-center justify-center",

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FormElement;
