import { useState, useEffect, useRef } from "react";

const useSuccessHandling = (duration = 3000) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleSuccess = (message: string | null) => {
    // Clear any existing timeouts
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set the new success message and make it visible
    setSuccessMessage(message);
    setIsVisible(true);

    // Update animation key to trigger re-animation
    setAnimationKey((prevKey) => prevKey + 1);

    // Set the timeout to hide the message after the specified duration
    timeoutIdRef.current = setTimeout(() => {
      setIsVisible(false);
      setSuccessMessage(null);
    }, duration);
  };

  useEffect(() => {
    return () => {
      // Cleanup: clear any existing timeouts when the component unmounts
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { successMessage, handleSuccess, isVisible, animationKey };
};

export default useSuccessHandling;
