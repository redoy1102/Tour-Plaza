import GallerySection from '@/modules/main/home/components/gallery/GallerySection';

const GalleryPage = () => {
    return (
        <div>
            <GallerySection isFullGalleryButtonOff={false} imageItems={12} />
        </div>
    );
};

export default GalleryPage;