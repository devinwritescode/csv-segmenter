import React, { useEffect, useRef } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";

interface SuccessMessageProps {
  message: string | null;
  handleSuccess: (message: string | null) => void;
  isVisible: boolean;
  animationKey: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  handleSuccess,
  isVisible,
  animationKey,
}) => {
  const animationRef = useRef<HTMLDivElement | null>(null);

  const clearSuccessMessage = () => {
    handleSuccess(null);
  };

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.classList.remove("animate-slideRightSuccess");
      void animationRef.current.offsetWidth;
      setTimeout(() => {
        if (isVisible && animationRef.current) {
          animationRef.current.classList.add("animate-slideRightSuccess");
        }
      }, 10);
    }
  }, [isVisible, message, animationKey]);

  return (
    <div
      className={`flex items-center justify-center gap-3 bg-emerald-700 text-emerald-200 px-4 py-2 rounded mb-4 relative overflow-hidden ${
        isVisible ? "flex" : "hidden"
      }`}
    >
      <CheckCircleIcon className="w-5 h-5 text-emerald-200" />
      {message}
      <div
        key={animationKey}
        ref={animationRef}
        className="absolute bottom-0 left-0 h-[3px] w-full bg-emerald-400"
      ></div>
      <IconButton
        onClick={clearSuccessMessage}
        Icon={XMarkIcon}
        className="rounded-full opacity-75"
      />
    </div>
  );
};

export default SuccessMessage;
