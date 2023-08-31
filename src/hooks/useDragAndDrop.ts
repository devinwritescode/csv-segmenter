// useDragAndDrop.ts
import { useCallback } from "react";

interface DragAndDropOptions {
  onDropFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useDragAndDrop = ({ onDropFile }: DragAndDropOptions) => {
  const handleDragEvents = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      const file = files[0];
      if (file) {
        // Create a simulated event to pass to handleFileChange
        const simulatedEvent = {
          target: {
            files: e.dataTransfer.files,
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
