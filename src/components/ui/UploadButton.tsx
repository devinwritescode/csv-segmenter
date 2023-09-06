import React from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface UploadButtonProps {
  handleButtonClick: () => void;
  handleDragEvents: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleSuccess: (message: string | null) => void;
  className?: string;
  buttonText?: string;
  errorField: string | null;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  handleButtonClick,
  handleDragEvents,
  handleDrop,
  className,
  buttonText,
  errorField,
}) => {
  return (
    <button
      onClick={handleButtonClick}
      onDragOver={handleDragEvents}
      onDragEnter={handleDragEvents}
      onDragLeave={handleDragEvents}
      onDrop={handleDrop}
      className={`font-normal flex justify-center items-center w-full h-40 m-auto gap-3 bg-slate-800 text-slate-100 px-4 py-2 rounded border border-dashed  hover:bg-slate-700 hover:border-slate-500 hover:shadow-lg focus:bg-slate-700 focus:border-slate-500 focus:shadow-lg ${
        errorField === "uploadError" ? "border-rose-600" : "border-slate-600"
      } transition-ease-in-out transition-all transition-duration: 225ms ${className}`}
    >
      {buttonText}
      <ArrowUpTrayIcon className="w-5 fill-inherit" />
    </button>
  );
};

export default UploadButton;
