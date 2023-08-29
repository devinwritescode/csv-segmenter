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
}) => {
  const [startSegment, setStartSegment] = useState<number | null>(null);
  const [endSegment, setEndSegment] = useState<number | null>(null);
  const [segmentCompleted, setSegmentCompleted] = useState<boolean>(false);

  const handleSegment = () => {
    if (!startSegment || !endSegment) return;

    if (endSegment > parsedData.length || startSegment > endSegment) {
      onSegmentError(
        "Selected segment exceeds the number of rows in your file or is invalid."
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

    // Here we modify the name of the downloaded file
    const originalFileName = fileName.split(".").slice(0, -1).join(".");
    const fileExtension = fileName.split(".").pop();
    a.download = `${originalFileName} - (${startSegment}-${endSegment}).${fileExtension}`;

    a.click();

    // Cleanup
    URL.revokeObjectURL(url);

    setSegmentCompleted(true);
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md flex items-center gap-6">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <span>Start Segment:</span>
          <input
            type="number"
            value={startSegment || ""}
            onChange={(e) => setStartSegment(parseInt(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded border border-gray-600"
          />
        </label>
        <label className="flex items-center gap-2">
          <span>End Segment:</span>
          <input
            type="number"
            value={endSegment || ""}
            onChange={(e) => setEndSegment(parseInt(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded border border-gray-600"
          />
        </label>
      </div>
      <button
        onClick={handleSegment}
        className="flex m-auto gap-3 bg-slate-800 text-slate-100 px-4 py-2 rounded outline outline-1 font-semibold hover:bg-rvx"
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
          }}
          className="rounded outline outline-1 px-1 py-1 first-letter:rounded text-slate-400 hover:bg-rvx hover:text-white hover:outline-slate-100"
        >
          <ArrowPathIcon className="fill-inherit w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default FileSegmenter;
