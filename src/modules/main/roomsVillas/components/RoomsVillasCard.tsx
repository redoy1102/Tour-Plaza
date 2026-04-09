import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Users,
  Maximize,
  Waves,
  Star,
} from "lucide-react";

interface RoomsVillasCardProps {
  room: {
    id: number;
    name: string;
    category: string;
    price: number;
    guests: number;
    sqft: string;
    amenities: string[];
    image: string;
    isPopular?: boolean;
  };
}

const RoomsVillasCard = ({ room }: RoomsVillasCardProps) => {
  return (
    <Card
      key={room.id}
      className="group flex flex-col h-full overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-4xl bg-white"
    >
      {/* Top: Image Section */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {room.isPopular && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm bg-opacity-90">
            <Star size={12} fill="currentColor" /> POPULAR
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
          <p className="text-xl font-bold text-[#0F172A]">
            ${room.price}
            <span className="text-[10px] text-slate-500 font-normal">
              {" "}
              /night
            </span>
          </p>
        </div>
      </div>

      {/* Middle: Content Section */}
      <CardContent className="grow p-6 flex flex-col">
        <div className="mb-4">
          <span className="text-accent font-bold text-[10px] uppercase tracking-widest">
            {room.category}
          </span>
          <h3 className="text-2xl font-serif text-[#0F172A] mt-1 line-clamp-1">
            {room.name}
          </h3>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-50 mb-4">
          <div className="flex flex-col items-center gap-1">
            <Users size={16} className="text-slate-400" />
            <span className="text-[11px] font-medium text-slate-600">
              {room.guests} Guests
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-100">
            <Maximize size={16} className="text-slate-400" />
            <span className="text-[11px] font-medium text-slate-600">
              {room.sqft} sqft
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Waves size={16} className="text-slate-400" />
            <span className="text-[11px] font-medium text-slate-600">
              Sea View
            </span>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {room.amenities.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-xs text-slate-500"
            >
              <CheckCircle2 size={14} className="text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Bottom: Action Buttons */}
      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-sm font-bold shadow-lg shadow-primary/10 transition-all active:scale-[0.98]">
          Book Now
        </Button>
        <Button
          variant="ghost"
          className="w-full h-12 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0F172A] group/btn"
        >
          View Gallery
          <ArrowRight
            size={14}
            className="ml-2 transition-transform group-hover/btn:translate-x-1"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomsVillasCard;
