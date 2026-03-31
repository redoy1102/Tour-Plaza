import { galleryData } from "@/data/landingPage/galleryData";
import GallerySection from "@/features/gallery/GallerySection";

const GalleryPage = () => {
  return (
    <div className="py-15">
      <GallerySection
        isFullGalleryButtonOff={true}
        imageItems={galleryData.length}
      />
    </div>
  );
};

export default GalleryPage;
