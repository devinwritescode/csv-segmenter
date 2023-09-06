import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import IconButton from "../buttons/IconButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TruncatedFileProps {
  selectedFile: File;
  parsedData: string[][];
  removeFile: () => void;
}

const TruncatedFile: React.FC<TruncatedFileProps> = ({
  selectedFile,
  parsedData,
  removeFile,
}) => {
  const truncateFilename = (filename: string, maxLength: number) => {
    if (filename.length > maxLength) {
      return `${filename.substring(0, maxLength - 3)}...`;
    }
    return filename;
  };

  return (
    <div className="flex gap-4 items-center">
      <IconButton
        onClick={() => removeFile()}
        Icon={XMarkIcon}
        className="rounded-full"
      />
      <div className="flex items-center gap-3">
        <span className="p-2 pr-4 pl-4 flex items-center bg-slate-700 font-normal rounded outline outline-1 outline-slate-600">
          <DocumentTextIcon className="w-4 mr-2" />
          {truncateFilename(selectedFile.name, 25)}
        </span>
        <span className="text-slate-400">{`${parsedData.length} rows`}</span>
      </div>
    </div>
  );
};

export default TruncatedFile;
