import React, { useState } from "react";
import Papa from "papaparse";

interface FileSegmenterProps {
  fileName: string;
  parsedData: string[][];
  onSegmentError: (error: string | null) => void; // Callback to set error in parent
}

const FileSegmenter: React.FC<FileSegmenterProps> = ({
  fileName,
  parsedData,
  onSegmentError,
}) => {
  const [startSegment, setStartSegment] = useState<number | null>(null);
  const [endSegment, setEndSegment] = useState<number | null>(null);

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
        className="bg-slate-800 text-white px-4 py-2 rounded outline font-semibold hover:bg-rvx"
      >
        Segment
      </button>
    </div>
  );
};

export default FileSegmenter;
