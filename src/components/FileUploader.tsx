import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "./FileSegmenter";
import {
  XMarkIcon,
  ArrowUpTrayIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";

const FileUploader: React.FC = () => {
  const [isFileValid, setIsFileValid] = useState<boolean>(true);
  const [segmentError, setSegmentError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resetFileState = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
    <div className="text-white min-h-screen p-6 text-center justify-center max-w-5xl">
      <div className=" m-auto gap-3 max-w-md flex justify-center mb-10">
        <BeakerIcon className="w-10 fill-current text-slate-100 bg-slate-700 rounded px-2" />
        <h1 className="text-4xl font-semibold m-0">CSV Segmenter</h1>
      </div>

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
                className="rounded outline outline-1 px-1 py-1 first-letter:rounded text-slate-400 hover:bg-red-500 hover:text-white hover:outline-slate-100"
              >
                <XMarkIcon className="fill-inherit w-5 h-5" />
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
            onRefresh={resetFileState}
          />
        </>
      ) : (
        <button
          onClick={handleButtonClick}
          className="flex m-auto gap-3 bg-slate-800 text-slate-100 px-4 py-2 rounded outline outline-1 font-semibold hover:bg-rvx"
        >
          Upload File
          <ArrowUpTrayIcon className="w-5 fill-inherit" />
        </button>
      )}
    </div>
  );
};

export default FileUploader;
