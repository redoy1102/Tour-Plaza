import { ArrowRight, Badge } from "lucide-react";

interface ExperienceCardProps {
  key: number;
  exp: {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    icon: React.ElementType;
  };
}
const ExperienceCard = ({ key, exp }: ExperienceCardProps) => {
  return (
    <div
      key={key}
      className="group relative h-125 overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Background */}
      <img
        src={exp.image}
        alt={exp.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-accent hover:bg-accent text-white">
            {exp.category}
          </Badge>
          <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
            <exp.icon size={16} />
          </div>
        </div>

        <h3 className="text-3xl font-serif font-bold text-white mb-3">
          {exp.title}
        </h3>

        <p className="text-slate-300 mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          {exp.description}
        </p>

        <button className="flex items-center gap-2 text-accent font-bold group/btn">
          Explore Experience
          <ArrowRight
            size={20}
            className="transition-transform group-hover/btn:translate-x-2"
          />
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
