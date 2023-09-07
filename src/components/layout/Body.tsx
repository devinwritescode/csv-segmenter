import React, { useState, useRef } from "react";
import FileSegmenter from "../functions/FileSegmenter";
import FileBatcher from "../functions/FileBatcher";
import ErrorMessage from "../uiItems/indicators/ErrorMessage";
import UploadButton from "../uiItems/buttons/UploadButton";
import useErrorHandling from "../../hooks/useErrorHandling";
import useSuccessHandling from "../../hooks/useSuccessHandling";
import SuccessMessage from "../uiItems/indicators/SuccessMessage";
import { BsFiletypeCsv } from "react-icons/bs";
import TruncatedFile from "../uiItems/extras/TruncatedFile";
import { useFileHandling } from "../../hooks/useFileHandling";
import useDragAndDrop from "../../hooks/useDragAndDrop";

const Body: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const { errorMessage, errorField, handleErrors, isVisible, animationKey } =
    useErrorHandling();
  const {
    successMessage,
    handleSuccess,
    isVisible: isSuccessVisible,
    animationKey: successAnimationKey,
  } = useSuccessHandling();

  const { handleFileChange, selectedFile, parsedData, removeFile } =
    useFileHandling(handleErrors, handleSuccess);

  const { handleDragEvents, handleDrop } = useDragAndDrop({
    onDropFile: handleFileChange,
  });

  const handleButtonClick = () => fileInputRef.current?.click();

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

  const renderSuccessMessages = () => (
    <>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          handleSuccess={handleSuccess}
          isVisible={isSuccessVisible}
          animationKey={successAnimationKey}
        />
      )}
    </>
  );

  // Render the file FileBatcher and FileSegmenter if a file is selected.
  const renderFileSelected = () => (
    <>
      <div className="flex items-center bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded mb-4 gap-4 w-full">
        <TruncatedFile
          selectedFile={selectedFile!}
          parsedData={parsedData}
          removeFile={removeFile}
        />
        <FileBatcher
          fileName={selectedFile!.name}
          parsedData={parsedData}
          handleErrors={handleErrors}
          handleSuccess={handleSuccess}
          errorField={errorField}
        />
      </div>
      <FileSegmenter
        fileName={selectedFile!.name}
        parsedData={parsedData}
        handleErrors={handleErrors}
        errorField={errorField}
        handleSuccess={handleSuccess}
        onSuccessfulSegment={() => setShowUpload(true)}
      />
      {showUpload && (
        // Shows UploadButton again underneath FileSegmenter once you've segmented a file.
        <UploadButton
          handleButtonClick={handleButtonClick}
          handleDragEvents={handleDragEvents}
          handleDrop={handleDrop}
          className="my-4"
          buttonText="Select or Drag and Drop Another File"
          errorField={errorField}
          handleSuccess={handleSuccess}
        />
      )}
    </>
  );

  // Render the UploadButton if no file is selected.
  const renderFileNotSelected = () => (
    <UploadButton
      handleButtonClick={handleButtonClick}
      handleDragEvents={handleDragEvents}
      handleDrop={handleDrop}
      className="my-4"
      buttonText="Select or Drag and Drop File"
      errorField={errorField}
      handleSuccess={handleSuccess}
    />
  );
  // Render the FileUploader component.
  return (
    <div className="p-4 bg-slate-900 flex items-center rounded-md outline outline-1 outline-slate-700">
      <div className="flex flex-col text-slate-100 p-6 items-center justify-center">
        <div className="gap-3 flex justify-center mb-10">
          <BsFiletypeCsv className="w-10 h-10 text-slate-100 bg-slate-800 rounded p-2 outline outline-1 outline-slate-700" />
          <h1 className="text-4xl font-medium m-0">CSV Segmenter</h1>
        </div>
        {renderErrorMessages()}
        {renderSuccessMessages()}

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

export default Body;
