import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "./FileSegmenter";
import FileBatcher from "./FileBatcher";
import ErrorMessage from "./ui/ErrorMessage";
import UploadButton from "./ui/upload";
import useDragAndDrop from "../hooks/useDragAndDrop";
import IconButton from "./ui/IconButton";

import {
  XMarkIcon,
  BeakerIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const FileUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const [segmentError, setSegmentError] = useState<string | null>(null);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset any previous errors
    setUploadError(null);

    if (file) {
      // Check for file extension
      if (file.type !== "text/csv") {
        setUploadError("Invalid file. Please upload a .CSV");
        setErrorField("uploadError");
        return;
      }

      // Check for file size (500 * 1024 * 1024 = 524288000 bytes = 500MB)
      if (file.size > 524288000) {
        setUploadError("File size too large. Max file size is 500mb");
        setErrorField("uploadError");
        return;
      }

      // Continue with existing logic
      setSelectedFile(file);

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (result) => {
          setParsedData(result.data as string[][]);
        },
      });
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSegmentError(null);
    setBatchError(null);
  };

  const { handleDragEvents, handleDrop } = useDragAndDrop({
    onDropFile: handleFileChange,
  });

  const truncateFilename = (filename: string, maxLength: number) => {
    if (filename.length > maxLength) {
      return `${filename.substring(0, maxLength - 3)}...`;
    }
    return filename;
  };

  const renderErrorMessages = () => (
    <>
      {uploadError && (
        <ErrorMessage
          message={uploadError}
          setErrorField={setErrorField}
          errorType="uploadError"
        />
      )}
      {segmentError && (
        <ErrorMessage
          message={segmentError}
          setErrorField={setErrorField}
          errorType="segmentError"
        />
      )}
      {batchError && (
        <ErrorMessage
          message={batchError}
          setErrorField={setErrorField}
          errorType="batchError"
        />
      )}
    </>
  );

  const renderFileSelected = () => (
    <>
      <div className="flex items-center bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded mb-4 gap-4 w-full">
        <IconButton onClick={removeFile} Icon={XMarkIcon} />
        <div className="flex items-center gap-3">
          <span className="p-2 pr-4 pl-4 flex items-center bg-slate-700 font-normal rounded outline outline-1 outline-slate-600">
            <DocumentTextIcon className="w-4 mr-2" />
            {truncateFilename(selectedFile!.name, 25)}
          </span>
          <span className="text-slate-400">{`${parsedData.length} rows`}</span>
        </div>
        <FileBatcher
          fileName={selectedFile!.name}
          parsedData={parsedData}
          onBatchError={setBatchError}
        />
      </div>
      <FileSegmenter
        fileName={selectedFile!.name}
        parsedData={parsedData}
        onSegmentError={setSegmentError}
        onSuccessfulSegment={() => setShowUpload(true)} // Add this
      />
      {showUpload && (
        <UploadButton
          handleButtonClick={handleButtonClick}
          handleDragEvents={handleDragEvents}
          handleDrop={handleDrop}
          errorField={errorField}
          className="my-4"
          buttonText="Upload or Drag and Drop Another File"
        />
      )}
    </>
  );

  const renderFileNotSelected = () => (
    <UploadButton
      handleButtonClick={handleButtonClick}
      handleDragEvents={handleDragEvents}
      handleDrop={handleDrop}
      errorField={errorField}
      buttonText="Select or Drag and Drop File"
    />
  );

  return (
    <div className="p-4 bg-slate-900 flex items-center rounded-md outline outline-1 outline-slate-700">
      <div className="flex flex-col text-slate-100 p-6 items-center justify-center">
        <div className="gap-3 flex justify-center mb-10">
          <BeakerIcon className="w-10 fill-current text-slate-100 bg-slate-800 rounded px-2 outline outline-1 outline-slate-700" />
          <h1 className="text-4xl font-medium m-0">CSV Segmenter</h1>
        </div>
        {renderErrorMessages()}
        <input
          type="file"
          accept=".csv"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {selectedFile ? renderFileSelected() : renderFileNotSelected()}
      </div>
    </div>
  );
};

export default FileUploader;
