import React, { useState, useRef } from "react";
import Papa from "papaparse";
import FileSegmenter from "../functions/FileSegmenter";
import FileBatcher from "../functions/FileBatcher";
import ErrorMessage from "../uiItems/indicators/ErrorMessage";
import UploadButton from "../uiItems/buttons/UploadButton";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import useErrorHandling from "../../hooks/useErrorHandling";
import useSuccessHandling from "../../hooks/useSuccessHandling";
import SuccessMessage from "../uiItems/indicators/SuccessMessage";
import { BsFiletypeCsv } from "react-icons/bs";
import TruncatedFile from "../uiItems/extras/TruncatedFile";

const Body: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const { errorMessage, errorField, handleErrors, isVisible, animationKey } =
    useErrorHandling();
  const {
    successMessage,
    handleSuccess,
    isVisible: isSuccessVisible,
    animationKey: successAnimationKey,
  } = useSuccessHandling();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset any previous errors
    handleErrors(null, null);

    if (file) {
      // Check for file extension
      if (file.type !== "text/csv") {
        // throw new Error("Invalid file. Please upload a .CSV"); and add uploadError to errorField within handleErrors
        handleErrors("Invalid file. Please upload a .CSV", "uploadError");
        return;
      }

      // Check for file size (500 * 1024 * 1024 = 524288000 bytes = 500MB)
      if (file.size > 524288000) {
        handleErrors(
          // throw new Error ("File size too large. Max file size is 500mb"); and add uploadError to errorField within handleErrors
          "File size too large. Max file size is 500mb",
          "uploadError"
        );
      } else {
        // if no errors, reset errorField and errorMessage
        handleErrors(null, null);
      }

      // Set the selected file
      setSelectedFile(file);

      handleSuccess("Upload successful!");

      // use papaparse to parse the file
      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (result) => {
          setParsedData(result.data as string[][]);
        },
      });
    }
  };

  // on button click trigger file input click.
  const handleButtonClick = () => fileInputRef.current?.click();

  // Removes the file from state and resets the file input as well as the error messages if they are present.
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleErrors(null, null);
    handleSuccess(null);
  };

  // Drag and drop functionality used in the UploadButton component.
  const { handleDragEvents, handleDrop } = useDragAndDrop({
    onDropFile: handleFileChange,
  });
  // Render the error messages if they are present and pass error props to the ErrorMessage component.
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
