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
  return (
    <div className="space-y-2">
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && (
        <div className="relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
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
