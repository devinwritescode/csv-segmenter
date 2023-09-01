import React, { useEffect, useRef } from "react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "./IconButton";

interface ErrorMessageProps {
  message: string | null;
  handleErrors: (message: string | null, field: string | null) => void;
  isVisible: boolean;
  animationKey: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  handleErrors,
  isVisible,
  animationKey,
}) => {
  const animationRef = useRef<HTMLDivElement | null>(null);
  // clear errors when the user clicks the XMarkIcon
  const clearErrorMessage = () => {
    handleErrors(null, null);
  };
  // reset animation when the error message changes
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.classList.remove("animate-slideRight");

      // Trigger reflow to reset the animation
      void animationRef.current.offsetWidth;

      // Use setTimeout to ensure the re-addition of the class occurs in a new event loop tick
      setTimeout(() => {
        if (isVisible && animationRef.current) {
          animationRef.current.classList.add("animate-slideRight");
        }
      }, 10);
    }
  }, [isVisible, message, animationKey]);

  return (
    <div
      className={`flex items-center justify-center gap-3 bg-rose-700 text-rose-200 px-4 py-2 rounded mb-4 relative overflow-hidden ${
        isVisible ? "flex" : "hidden"
      }`}
    >
      <ExclamationTriangleIcon className="w-5 h-5 text-rose-200" />
      {message}
      <div
        key={animationKey}
        ref={animationRef}
        className={`absolute bottom-0 left-0 h-[3px] w-full bg-rose-400 
        }`}
      ></div>
      <IconButton
        onClick={clearErrorMessage}
        Icon={XMarkIcon}
        className="rounded-full opacity-75"
      />
    </div>
  );
};

export default ErrorMessage;
