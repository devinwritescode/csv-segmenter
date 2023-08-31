import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button.tsx";
import InputWithPlaceholder from "./ui/InputWithPlaceholder";

interface FileBatcherProps {
  fileName: string;
  parsedData: string[][];
  onBatchError: (error: string | null) => void;
}

const FileBatcher: React.FC<FileBatcherProps> = ({
  fileName,
  parsedData,
  onBatchError,
}) => {
  const [batchSize, setBatchSize] = useState<number | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);

  const createBatches = () => {
    if (!batchSize) {
      onBatchError("Error | Refresh Browser");
      return;
    }

    if (batchSize >= parsedData.length) {
      onBatchError("Batch size exceeds row count.");
      setErrorField("batchSize");

      return;
    }

    onBatchError(null);
    setErrorField(null);

    const zip = new JSZip();

    // Logic to divide `parsedData` into batches and add them to the ZIP
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

  const renderInputField = () => (
    <InputWithPlaceholder
      type="number"
      placeholder="Batch size"
      onChange={(value) => {
        if (typeof value === "number") {
          setBatchSize(value);
        }
      }}
      errorField={errorField}
      fieldName="batchSize"
    />
  );

  const renderCreateButton = () => (
    <Button
      onClick={createBatches}
      text="Create Batches"
      Icon={FolderArrowDownIcon}
    />
  );

  return (
    <div className="ml-auto flex items-center gap-4">
      {renderInputField()}
      {renderCreateButton()}
    </div>
  );
};

export default FileBatcher;
