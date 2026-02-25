import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ImageUploaderProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string;
  handleRemoveImage: () => void;
}

const ImageUploader = ({
  handleImageChange,
  imagePreview,
  handleRemoveImage,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Clear the native file input when preview is removed so same file can be re-selected
  useEffect(() => {
    if (!imagePreview && fileInputRef.current) {
      try {
        fileInputRef.current.value = "";
      } catch (e) {
        console.error("Error clearing file input:", e);
      }
    }
  }, [imagePreview]);

  const handleRemove = () => {
    handleRemoveImage();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imagePreview && (
        <div className="relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
