import { useState } from "react";
import Papa from "papaparse";

interface UseFileHandlingReturnType {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  parsedData: string[][];
  removeFile: () => void;
}

export const useFileHandling = (
  handleErrors: (message: string | null, field: string | null) => void,
  handleSuccess: (message: string | null) => void
): UseFileHandlingReturnType => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string[][]>([]);

  const removeFile = () => {
    setSelectedFile(null);
    setParsedData([]);
  };

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

  return { handleFileChange, selectedFile, parsedData, removeFile };
};
