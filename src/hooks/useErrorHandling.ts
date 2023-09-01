import { useState, useRef } from "react";

const useErrorHandling = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0); // <-- Add this
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleErrors = (message: string | null, field: string | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setErrorMessage(message);
    setErrorField(field);

    if (message && field) {
      setIsVisible(true);
      setAnimationKey((prevKey) => prevKey + 1); // <-- Increment key
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setErrorMessage(null);
        setErrorField(null);
      }, 10000);
    }
  };

  return { errorMessage, errorField, isVisible, handleErrors, animationKey }; // <-- return animationKey
};

export default useErrorHandling;
