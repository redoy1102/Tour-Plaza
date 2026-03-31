import { Star, Heart } from "lucide-react";

interface GalleryCardProps {
  item: {
    id: number;
    title: string;
    image: string;
    rating: number;
  };
  likedImages: Set<number>;
  toggleLike: (id: number) => void;
}

const GalleryCard = ({ item, likedImages, toggleLike }: GalleryCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl group shadow-md break-inside-avoid">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-sm">{item.rating}</span>
            </div>
            <button
              onClick={() => toggleLike(item.id)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Like image"
            >
              <Heart
                size={20}
                className={`transition-all ${
                  likedImages.has(item.id)
                    ? "text-red-500 fill-red-500"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
