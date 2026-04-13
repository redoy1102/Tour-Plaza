import { useState } from "react";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { galleryData } from "@/data/landingPage/galleryData";
import GalleryCard from "./components/GalleryCard";
import { useNavigate } from "react-router";

interface GallerySectionProps {
  isFullGalleryButtonOff?: boolean;
  imageItems?: number;
}

const GallerySection = ({
  isFullGalleryButtonOff = false,
  imageItems = galleryData.length,
}: GallerySectionProps) => {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedImages((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-12 bg-background overflow-hidden w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Visual Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Explore Our <span className="text-primary">Paradise</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Immerse yourself in the beauty and tranquility of our resort. Each
            image captures a moment of the unforgettable experience that awaits
            you.
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.slice(0, imageItems).map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              likedImages={likedImages}
              toggleLike={toggleLike}
            />
          ))}
        </div>

        <div className="flex justify-center pt-10 lg:pt-20">
          {isFullGalleryButtonOff && (
            <PrimaryButton
              title="View Full Gallery"
              hoverType
              px="8"
              py="6"
              onClick={() => {
                scrollTo({ top: 0, behavior: "smooth" });
                navigate("/gallery");
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
