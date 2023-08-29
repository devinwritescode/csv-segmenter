import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "./FileSegmenter";

const FileUploader: React.FC = () => {
  const [isFileValid, setIsFileValid] = useState<boolean>(true);
  const [segmentError, setSegmentError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (result) => {
          if (result.data.length > 50000) {
            setIsFileValid(false);
            alert("The file exceeds the maximum row limit of 50,000.");
            return;
          }

          setParsedData(result.data as string[][]);
          setIsFileValid(true);
        },
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="text-white min-h-screen p-6 text-center justify-center">
      <h1 className="text-4xl mb-8 font-semibold">CSV Segmenter</h1>

      {!isFileValid && (
        <p className="bg-red-600 text-white px-4 py-2 rounded mb-4">
          Invalid file! Please choose a CSV with less than 50,000 rows.
        </p>
      )}

      {segmentError && (
        <p className="bg-red-600 text-white px-4 py-2 rounded mb-4">
          {segmentError}
        </p>
      )}

      <input
        type="file"
        accept=".csv"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {selectedFile ? (
        <>
          <div className="flex items-center bg-gray-700 p-4 rounded mb-4 gap-4">
            <div>
              <button
                onClick={removeFile}
                className="outline pr-2 pl-2 pt-1 pb-1 rounded hover:bg-red-500"
              >
                X
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="p-2 pr-4 pl-4 flex items-center bg-slate-600 font-semibold rounded underline">{`${selectedFile.name}`}</span>
              <span>{`${parsedData.length} rows`}</span>
            </div>
          </div>
          <FileSegmenter
            fileName={selectedFile.name}
            parsedData={parsedData}
            onSegmentError={setSegmentError}
          />
        </>
      ) : (
        <button
          onClick={handleButtonClick}
          className="bg-slate-800 text-white px-4 py-2 rounded outline font-semibold hover:bg-rvx"
        >
          Upload File
        </button>
      )}
    </div>
  );
};

export default FileUploader;
