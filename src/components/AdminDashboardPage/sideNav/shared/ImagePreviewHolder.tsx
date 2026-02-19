interface ImagePreviewHolderProps {
  imageSrc: string | FileList | undefined;
  altText?: string;
  imgWidth?: number; // Default width in Tailwind units (e.g., 10 for w-10)
  imgHeight?: number; // Default height in Tailwind units (e.g., 10 for h-10)
}

const ImagePreviewHolder = ({
  imageSrc,
  altText = "Image Preview",
  imgWidth = 10,
  imgHeight = 10,
}: ImagePreviewHolderProps) => {
  return (
    <div>
      {imageSrc &&
      (typeof imageSrc === "string" ||
        (imageSrc as FileList).length > 0) ? (
        <img
          src={
            typeof imageSrc === "string"
              ? imageSrc
              : URL.createObjectURL((imageSrc as FileList)[0])
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
