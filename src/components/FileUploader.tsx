import React, { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileRead: (arrayBuffer: ArrayBuffer) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileRead }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onFileRead(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
    // reset value so same file can be re-uploaded if needed
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <input
        ref={inputRef}
        type="file"
        accept=".epub"
        className="sr-only"
        onChange={handleChange}
      />
      <Button variant="outline" onClick={handleClick}>
        Upload EPUB
      </Button>
    </div>
  );
};

export default FileUploader;
