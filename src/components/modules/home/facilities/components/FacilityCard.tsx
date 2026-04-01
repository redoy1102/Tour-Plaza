interface FacilityCardProps {
  title: string;
  description: string;
  image: string;
}

const FacilityCard = ({ title, description, image }: FacilityCardProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 transform group-hover:-translate-y-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;
