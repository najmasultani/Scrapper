
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onFileChange: (file: File | null, previewUrl: string | null) => void;
  initialUrl?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange, initialUrl = null }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileChange(file, url);
    } else {
      setPreview(null);
      onFileChange(null, null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        data-testid="restaurant-image-input"
      />
      <Button variant="outline" type="button" onClick={() => inputRef.current?.click()}>
        {preview ? "Change Image" : "Upload Image"}
      </Button>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 rounded-lg border w-32 h-32 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUpload;
