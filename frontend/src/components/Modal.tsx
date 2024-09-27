import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen bg-black p-5 flex items-center justify-end    bg-opacity-50 fixed top-0 left-0">
      <div className="w-[600px] p-6 h-full bg-white rounded-xl">{children}</div>
    </div>
  );
};
export default Modal;
