//Placeholder for when we break off the file upload into its own component from the Body.tsx componenet.

import React from "react";
import Papa from "papaparse";

interface FileUploadProps {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setParsedData: React.Dispatch<React.SetStateAction<string[][]>>;
  handleErrors: (message: string | null, field: string | null) => void;
  handleSuccess: (message: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setSelectedFile,
  setParsedData,
  handleErrors,
  handleSuccess,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleErrors(null, null);

    if (file) {
      if (file.type !== "text/csv") {
        handleErrors("Invalid file. Please upload a .CSV", "uploadError");
        return;
      }

      if (file.size > 524288000) {
        handleErrors(
          "File size too large. Max file size is 500mb",
          "uploadError"
        );
      } else {
        handleErrors(null, null);
      }

      setSelectedFile(file);
      handleSuccess("Upload successful!");

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (result) => {
          setParsedData(result.data as string[][]);
        },
      });
    }
  };

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
