// Custom hook for error message data and state handling

import { useState, useRef } from "react";

// Create a custom hook to handle errors
const useErrorHandling = () => {
  // Create state variables for the error message, error field, and visibility of the error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Create a state variable to update the key of the error message to trigger a transition
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Create a ref to store the timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create a callback function to handle errors
  const handleErrors = (message: string | null, field: string | null) => {
    // If there's already a timeout, clear it
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update the error message and field
    setErrorMessage(message);
    setErrorField(field);

    // If there's an error message and field, set the error message as visible
    if (message && field) {
      setIsVisible(true);
      setAnimationKey((prevKey) => prevKey + 1);

      // Set a timeout to hide the error message after 10 seconds
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setErrorMessage(null);
        setErrorField(null);
      }, 10000);
    }
  };

  // Return the error message, field, and visibility
  return { errorMessage, errorField, isVisible, handleErrors, animationKey };
};

export default useErrorHandling;
