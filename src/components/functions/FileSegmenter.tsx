import React, { useState } from "react";
import Papa from "papaparse";
import Button from "../uiItems/buttons/Button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Input from "../uiItems/inputs/Input";

interface FileSegmenterProps {
  fileName: string;
  parsedData: string[][];
  onSuccessfulSegment: () => void;
  handleErrors: (message: string | null, field: string | null) => void;
  errorField: string | null;
  handleSuccess: (message: string | null) => void;
}

const FileSegmenter: React.FC<FileSegmenterProps> = ({
  fileName,
  parsedData,
  onSuccessfulSegment,
  handleErrors,
  errorField,
  handleSuccess,
}) => {
  const [startSegment, setStartSegment] = useState<number | null>(null);
  const [endSegment, setEndSegment] = useState<number | null>(null);

  // handleSegment takes the startSegment and endSegment values and checks for errors
  const handleSegment = () => {
    if (!startSegment || !endSegment) {
      handleErrors("Input a start and end segment", "startSegment");
      return;
    }

    if (startSegment > endSegment) {
      handleErrors(
        "Start segment cannot be greater than end segment",
        "startSegment"
      );
      return;
    }

    if (endSegment > parsedData.length || startSegment > endSegment) {
      handleErrors(
        "Selected segment exceeds the number of rows in your file",
        "endSegment"
      );
      return;
    }
    handleErrors(null, null);
    onSuccessfulSegment();

    // Get the headers and the desired segment
    const headers = [parsedData[0]];
    const segment = parsedData.slice(startSegment, endSegment + 1);

    // Convert back to CSV string
    const csvString = Papa.unparse([...headers, ...segment]);

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });

    // Generate a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;

    // Modify the name of the downloaded file
    const originalFileName = fileName.split(".").slice(0, -1).join(".");
    const fileExtension = fileName.split(".").pop();

    a.download = `${originalFileName} - (${startSegment}-${endSegment}).${fileExtension}`;

    a.click();

    handleSuccess("Segment successful!");

    // Cleanup and state reset
    URL.revokeObjectURL(url);
    setStartSegment(null);
    setEndSegment(null);
  };

  // pretty self explanatory
  const renderInputs = () => (
    <div className="flex items-center gap-6">
      <Input
        label="Start Segment"
        type="number"
        value={startSegment}
        onChange={(value) => setStartSegment(value)}
        errorField={errorField}
        fieldName="startSegment"
      />
      <Input
        label="End Segment"
        type="number"
        value={endSegment}
        onChange={(value) => setEndSegment(value)}
        errorField={errorField}
        fieldName="endSegment"
      />
    </div>
  );

  const renderSegmentButton = () => (
    <Button onClick={handleSegment} text="Segment" Icon={ArrowDownTrayIcon} />
  );

  return (
    <div className="bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded flex items-center gap-6 w-full ">
      {renderInputs()}
      {renderSegmentButton()}
    </div>
  );
};

export default FileSegmenter;
