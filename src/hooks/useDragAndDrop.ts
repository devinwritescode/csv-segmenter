import React, { useCallback } from "react";

interface DragAndDropOptions {
  onDropFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// drag and drop hook for file upload component
const useDragAndDrop = ({ onDropFile }: DragAndDropOptions) => {
  const handleDragEvents = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);
  // handle drop event for file upload component
  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      const file = files[0];
      if (file) {
        const simulatedEvent = {
          target: {
            files: event.dataTransfer.files,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onDropFile(simulatedEvent);
      }
    },
    [onDropFile]
  );

  return { handleDragEvents, handleDrop };
};

export default useDragAndDrop;
