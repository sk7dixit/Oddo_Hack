import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

const ErrorState = ({ message }: Props) => {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-50">
        <AlertCircle size={20} />
      </div>
      <div>
        <p className="text-rose-900 text-sm font-bold">Action Failed</p>
        <p className="text-rose-600 text-[13px]">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
