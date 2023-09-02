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
  handleErrors: (message: string | null, field: string | null) => void;
  errorField: string | null;
  handleSuccess: (message: string) => void;
}

const FileBatcher: React.FC<FileBatcherProps> = ({
  fileName,
  parsedData,
  handleErrors,
  errorField,
  handleSuccess,
}) => {
  const [batchSize, setBatchSize] = useState<number | null>(null);

  // Create batches takes the batchSize value and checks for errors
  const createBatches = () => {
    if (!batchSize) {
      handleErrors("Input a number to batch.", "batch");
      return;
    }

    if (batchSize >= parsedData.length) {
      handleErrors("Batch size exceeds row count.", "batch");
      return;
    }

    handleErrors(null, null);

    // Create a new ZIP file
    const zip = new JSZip();

    // Logic to divide `parsedData` into batches and add them to the ZIP
    for (let i = 0, j = parsedData.length; i < j; i += batchSize) {
      const tempArray = parsedData.slice(i, i + batchSize);
      const csv = Papa.unparse(tempArray);

      // Check if this is the final batch
      const isFinalBatch = i + batchSize >= j;

      const endIndex = isFinalBatch ? j : i + batchSize;

      // if the final batch is less than the batch size
      // use the end index to change the suffix of the last downloaded file in the zip.
      const suffix = isFinalBatch ? `${endIndex}` : `to-${i + batchSize}`;

      //Add the CSV files to the ZIP and assign them a name based on the batch number
      zip.file(`${fileName}-Batch-${i + 1}-${suffix}.csv`, csv);
    }
    // Generate the ZIP file and trigger the download
    // Assign the zip file a name based on the batch size
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${fileName}-Batches-of-${batchSize}.zip`);
    });

    handleSuccess("Batching successful!");
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
      fieldName="batch"
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
