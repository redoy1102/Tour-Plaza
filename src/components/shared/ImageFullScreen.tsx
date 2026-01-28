import { X } from "lucide-react";

interface ImageFullScreenProps {
    selectedImage: string | null;
    setSelectedImage: (image: string | null) => void;
}

const ImageFullScreen = ({selectedImage, setSelectedImage}: ImageFullScreenProps) => {
    return (
        <div>
            {selectedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 md:p-12 animate-in fade-in zoom-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="max-w-7xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={selectedImage} 
              alt="Full screen team" 
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
            
        </div>
    );
};

export default ImageFullScreen;