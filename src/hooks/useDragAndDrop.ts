import { useCallback } from "react";

// 1. Create a custom type for the options that will be passed to the hook
interface DragAndDropOptions {
  onDropFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 2. Export the hook function
const useDragAndDrop = ({ onDropFile }: DragAndDropOptions) => {
  // 3. Create a function that accepts a `React.DragEvent` and prevents the default behavior
  const handleDragEvents = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // 4. Create a function that accepts a `React.DragEvent`, prevents the default behavior, and calls
  // `onDropFile` with the `e` as an argument
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
