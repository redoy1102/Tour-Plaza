interface ImagePreviewHolderProps {
  instructorImage: string | FileList | undefined;
  altText?: string;
  imgWidth?: number; // Default width in Tailwind units (e.g., 10 for w-10)
  imgHeight?: number; // Default height in Tailwind units (e.g., 10 for h-10)
}

const ImagePreviewHolder = ({
  instructorImage,
  altText = "Instructor Image",
  imgWidth = 10,
  imgHeight = 10,
}: ImagePreviewHolderProps) => {
  return (
    <div>
      {instructorImage &&
      (typeof instructorImage === "string" ||
        (instructorImage as FileList).length > 0) ? (
        <img
          src={
            typeof instructorImage === "string"
              ? instructorImage
              : URL.createObjectURL((instructorImage as FileList)[0])
          }
          alt={altText}
          className={`w-${imgWidth} h-${imgHeight} rounded-full object-fill`}
        />
      ) : (
        <div
          className={`w-${imgWidth} h-${imgHeight} rounded-full bg-gray-300 flex items-center justify-center text-gray-600`}
        >
          N/A
        </div>
      )}
    </div>
  );
};

export default ImagePreviewHolder;
