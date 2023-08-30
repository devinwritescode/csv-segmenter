import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Square2StackIcon } from "@heroicons/react/24/outline"; // Replace with the correct import

const FileBatcher: React.FC<{ fileName: string; parsedData: string[][] }> = ({
  fileName,
  parsedData,
}) => {
  const [batchSize, setBatchSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createBatches = () => {
    if (!batchSize) {
      setError("Batch size must be a number.");
      return;
    }

    if (batchSize >= parsedData.length) {
      setError("Batch size exceeds row count.");
      return;
    }

    const zip = new JSZip();

    // Your logic to divide `parsedData` into batches and add them to the ZIP
    for (let i = 0, j = parsedData.length; i < j; i += batchSize) {
      const tempArray = parsedData.slice(i, i + batchSize);
      const csv = Papa.unparse(tempArray);

      // Check if this is the final batch
      const isFinalBatch = i + batchSize >= j;

      const endIndex = isFinalBatch ? j : i + batchSize;

      const suffix = isFinalBatch ? `${endIndex}` : `to-${i + batchSize}`;

      zip.file(`${fileName}-Batch-${i + 1}-${suffix}.csv`, csv);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${fileName}-Batches-of-${batchSize}.zip`);
    });
  };

  return (
    <div className="ml-auto flex items-center gap-4">
      <input
        type="number"
        placeholder="Batch size"
        onChange={(e) => setBatchSize(Number(e.target.value))}
        className="bg-slate-700 text-slate-100 p-2 rounded border border-slate-600 focus:outline focus:outline-1 outline-slate-300 focus:shadow-lg placeholder:text-slate-400"
      />
      <button
        onClick={createBatches}
        className="flex items-center m-auto gap-2 bg-slate-800 text-slate-100 px-4 py-2 rounded outline outline-1 outline-slate-700 font-normal hover:bg-blue-800 hover:outline-blue-800 hover:shadow-lg transition-ease-in-out transition-all transition-duration: 225ms"
      >
        Create Batches
        <Square2StackIcon className="w-5" />{" "}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FileBatcher;
