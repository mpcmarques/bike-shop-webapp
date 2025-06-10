import { BiError } from "react-icons/bi";

const ErrorCard = ({ error }: { error?: string }) => {
  return (
    <div className=" bg-red-400 p-4 rounded-lg flex gap-6 items-center text-slate-200 font-semibold">
      <BiError className="text-2xl text-white" />
      {error}
    </div>
  );
};

export default ErrorCard;
