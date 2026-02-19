interface ImagePreviewHolderProps {
  instructorImage: string | FileList | undefined;
  altText?: string;
}

const ImagePreviewHolder = ({
  instructorImage,
  altText = "Instructor Image",
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
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
          N/A
        </div>
      )}
    </div>
  );
};

export default ImagePreviewHolder;
