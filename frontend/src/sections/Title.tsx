import { Fragment } from "react";

const Title = () => {
  return (
    <Fragment>
      <div className="flex items-center space-x-5 ">
        <img alt="Logo" src="/Logo.svg" />
        <h1 className="text-[40px]">My Task Board</h1>
        <img alt="Edit Duotone" src="/Edit_duotone.svg" />
      </div>
      <div className="pl-[62px]">Tasks to keep organised</div>
    </Fragment>
  );
};
export default Title;
