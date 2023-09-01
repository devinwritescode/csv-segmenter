import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "./FileSegmenter";
import FileBatcher from "./FileBatcher";
import ErrorMessage from "./ui/ErrorMessage";
import UploadButton from "./ui/UploadButton";
import useDragAndDrop from "../hooks/useDragAndDrop";
import useErrorHandling from "../hooks/useErrorHandling";
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
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const { errorMessage, errorField, handleErrors, isVisible, animationKey } =
    useErrorHandling();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset any previous errors
    handleErrors(null, null);

    if (file) {
      // Check for file extension
      if (file.type !== "text/csv") {
        handleErrors("Invalid file. Please upload a .CSV", "uploadError");
        return;
      }

      // Check for file size (500 * 1024 * 1024 = 524288000 bytes = 500MB)
      if (file.size > 524288000) {
        handleErrors(
          "File size too large. Max file size is 500mb",
          "uploadError"
        );
      } else {
        handleErrors(null, null);
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
    handleErrors(null, null);
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
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          handleErrors={handleErrors}
          isVisible={isVisible}
          animationKey={animationKey}
        />
      )}
    </>
  );

  const renderFileSelected = () => (
    <>
      <div className="flex items-center bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded mb-4 gap-4 w-full">
        <IconButton
          onClick={removeFile}
          Icon={XMarkIcon}
          className="rounded-full"
        />
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
          handleErrors={handleErrors}
          errorField={errorField}
        />
      </div>
      <FileSegmenter
        fileName={selectedFile!.name}
        parsedData={parsedData}
        handleErrors={handleErrors}
        errorField={errorField}
        onSuccessfulSegment={() => setShowUpload(true)}
      />
      {showUpload && (
        <UploadButton
          handleButtonClick={handleButtonClick}
          handleDragEvents={handleDragEvents}
          handleDrop={handleDrop}
          className="my-4"
          buttonText="Select or Drag and Drop Another File"
          errorField={errorField}
        />
      )}
    </>
  );

  const renderFileNotSelected = () => (
    <UploadButton
      handleButtonClick={handleButtonClick}
      handleDragEvents={handleDragEvents}
      handleDrop={handleDrop}
      className="my-4"
      buttonText="Select or Drag and Drop Another File"
      errorField={errorField}
    />
  );

  return (
    <div className="p-4 bg-slate-900 flex items-center rounded-md outline outline-1 outline-slate-700">
      <div className="flex flex-col text-slate-100 p-6 items-center justify-center">
        <div className="gap-3 flex justify-center mb-10">
          <BeakerIcon className="w-10 text-slate-100 bg-slate-800 rounded px-2 outline outline-1 outline-slate-700" />
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
