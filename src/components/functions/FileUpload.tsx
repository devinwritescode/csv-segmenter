// FileUpload.tsx
import React from "react";
import { useFileHandling } from "../../hooks/useFileHandling";

interface FileUploadProps {
  handleErrors: (message: string | null, field: string | null) => void;
  handleSuccess: (message: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleErrors,
  handleSuccess,
}) => {
  const { handleFileChange } = useFileHandling(handleErrors, handleSuccess);

  return (
    <input
      type="file"
      accept=".csv"
      className="hidden"
      onChange={handleFileChange}
    />
  );
};

export default FileUpload;
