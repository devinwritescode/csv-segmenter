import React, { useEffect } from "react";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorMessageProps {
  message: string | null;
  setErrorField: (field: string | null) => void;
  errorType: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  setErrorField,
  errorType,
}) => {
  useEffect(() => {
    setErrorField(errorType);

    return () => {
      setErrorField(null);
    };
  }, [errorType, setErrorField]);

  return (
    <div className="flex items-center justify-center gap-3 bg-rose-700 text-slate-300 px-4 py-2 rounded mb-4">
      <ExclamationTriangleIcon className="w-5 h-5" />
      {message}
    </div>
  );
};

export default ErrorMessage;
