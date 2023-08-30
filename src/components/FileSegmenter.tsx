import React, { useState } from "react";
import Papa from "papaparse";
import { ArrowPathIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface FileSegmenterProps {
  fileName: string;
  parsedData: string[][];
  onSegmentError: (error: string | null) => void; // Callback to set error in parent
  onRefresh: () => void;
}

const FileSegmenter: React.FC<FileSegmenterProps> = ({
  fileName,
  parsedData,
  onSegmentError,
  onRefresh,
}) => {
  const [startSegment, setStartSegment] = useState<number | null>(null);
  const [endSegment, setEndSegment] = useState<number | null>(null);
  const [segmentCompleted, setSegmentCompleted] = useState<boolean>(false);

  const handleSegment = () => {
    if (!startSegment || !endSegment) return;

    if (startSegment > endSegment) {
      onSegmentError("Start segment cannot be greater than end segment.");
      return;
    }

    if (endSegment > parsedData.length || startSegment > endSegment) {
      onSegmentError(
        "Selected segment exceeds the number of rows in your file."
      );
      return;
    }
    onSegmentError(null);

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

    // Cleanup and state reset
    URL.revokeObjectURL(url);
    setSegmentCompleted(true);

    // Clear the 'start segment' and 'end segment' inputs
    setStartSegment(null);
    setEndSegment(null);
  };

  return (
    <div className="bg-slate-800 outline outline-1 outline-slate-700 p-4 rounded flex items-center gap-6 w-full ">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-slate-400">
          <span>Start Segment:</span>
          <input
            type="number"
            value={startSegment || ""}
            onChange={(e) => setStartSegment(parseInt(e.target.value))}
            className="bg-slate-700 text-slate-400 p-2 rounded border border-slate-600 focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg"
          />
        </label>
        <label className="flex items-center gap-2 text-slate-400">
          <span>End Segment:</span>
          <input
            type="number"
            value={endSegment || ""}
            onChange={(e) => setEndSegment(parseInt(e.target.value))}
            className="bg-slate-700 text-slate-400 p-2 rounded border border-slate-600 focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg"
          />
        </label>
      </div>
      <button
        onClick={handleSegment}
        className="flex ml-auto gap-3 bg-slate-800 text-slate-100 px-4 py-2 rounded outline outline-1 outline-slate-700 font-normal hover:bg-blue-800 hover:outline-blue-800 hover:shadow-lg transition-ease-in-out transition-all transition-duration: 225ms"
      >
        Segment
        <ArrowDownTrayIcon className="w-5 fill-inherit" />
      </button>
      {segmentCompleted && (
        <button
          onClick={() => {
            setSegmentCompleted(false); // Reset segment state
            setStartSegment(null); // Reset start segment
            setEndSegment(null); // Reset end segment
            onSegmentError(null); // Clear any existing errors
            onRefresh();
          }}
          className="rounded outline outline-1 outline-slate-700 p-2 first-letter:rounded text-slate-400 hover:bg-blue-800 hover:text-slate-100 hover:outline-blue-800 hover:shadow-md transition-ease-in-out transition-all transition-duration: 225ms"
        >
          <ArrowPathIcon className="fill-inherit w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default FileSegmenter;
