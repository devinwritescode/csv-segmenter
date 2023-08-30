import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "./FileSegmenter";
import FileBatcher from "./FileBatcher";
import {
  XMarkIcon,
  ArrowUpTrayIcon,
  BeakerIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

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
    setSegmentError(null);
  };

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    if (file) {
      // Create a simulated event to pass to handleFileChange
      const simulatedEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleFileChange(simulatedEvent);
    }
  };

  return (
    <div className="p-4 bg-slate-900  flex justify-content items-center max-h-max rounded-md outline outline-1 outline-slate-700">
      <div className="flex flex-col text-slate-100 p-6 items-center justify-center max-w-5xl">
        <div className="gap-3 flex justify-center mb-10">
          <BeakerIcon className="w-10 fill-current text-slate-100 bg-slate-800 rounded px-2 outline outline-1 outline-slate-700" />
          <h1 className="text-4xl font-medium m-0">CSV Segmenter</h1>
        </div>

        {!isFileValid && (
          <p className="bg-orange-500 text-white px-4 py-2 rounded mb-4">
            Invalid file! Please choose a .CSV file.
          </p>
        )}

        {segmentError && (
          <p className="flex items-center justify-center gap-3 bg-rose-700 text-slate-300 px-4 py-2 rounded mb-4">
            <ExclamationTriangleIcon className="w-5 h-5" />
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
            <div className="flex items-center bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded mb-4 gap-4 w-full">
              <div>
                <button
                  onClick={removeFile}
                  className="rounded outline outline-1 outline-slate-700 px-1 py-1 first-letter:rounded text-slate-400 hover:text-slate-200 hover:outline-slate-200 transition-ease-in-out transition-all transition-duration: 225ms;
                  "
                >
                  <XMarkIcon className="fill-inherit w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-2 pr-4 pl-4 flex items-center bg-slate-700 font-normal rounded outline outline-1 outline-slate-600">
                  <DocumentTextIcon className="w-4 mr-2" />{" "}
                  {`${selectedFile.name}`}
                </span>
                <span>{`${parsedData.length} rows`}</span>
              </div>
              <FileBatcher
                fileName={selectedFile.name}
                parsedData={parsedData}
                onBatchError={setSegmentError}
              />
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
            onDragOver={handleDragEvents}
            onDragEnter={handleDragEvents}
            onDragLeave={handleDragEvents}
            onDrop={handleDrop}
            className="font-normal flex justify-center items-center w-full h-40 m-auto gap-3 bg-slate-800 text-slate-100 px-4 py-2 rounded outline-dashed outline-1 outline-slate-600 hover:bg-slate-700 hover:outline-slate-500 hover:shadow-lg transition-ease-in-out transition-all transition-duration: 225ms"
          >
            Select or Drag and Drop File
            <ArrowUpTrayIcon className="w-5 fill-inherit" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
