import { Helmet } from "react-helmet-async";
import GallerySection from "@/modules/main/home/components/gallery/GallerySection";

const GalleryPage = () => {
  return (
    <div>
      <Helmet>
        <title>Gallery | Tour Plaza</title>
      </Helmet>
      <GallerySection isFullGalleryButtonOff={false} />
    </div>
  );
};

export default GalleryPage;
