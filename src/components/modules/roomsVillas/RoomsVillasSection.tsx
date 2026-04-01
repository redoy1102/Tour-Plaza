import { Badge } from "@/components/ui/badge";
import {
  Users,
  Maximize,
  Waves,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomsVillasData } from "@/data/roomsVillasData";
import { useMemo, useState } from "react";
import ResetFilters from "@/components/shared/buttons/ResetFilterButton";

const RoomsVillasSection = () => {
  const [selectedType, setSelectedType] = useState("all");
  console.log("Selected Type:", selectedType); // Debugging log
  const [selectedGuests, setSelectedGuests] = useState("0");
  const [selectedPrice, setSelectedPrice] = useState("featured");

  const filteredRooms = useMemo(() => {
    if (
      selectedType === "all" &&
      selectedGuests === "0" &&
      selectedPrice === "featured"
    ) {
      return RoomsVillasData;
    } else {
      const filteredTypes =
        selectedType === "all"
          ? RoomsVillasData
          : RoomsVillasData.filter(
              (room) => room.category.toLowerCase() === selectedType,
            );

      const filteredGuests =
        selectedGuests === "0"
          ? filteredTypes
          : filteredTypes.filter((room) => {
              if (selectedGuests === "4") {
                return room.guests >= 4;
              }
              return room.guests === parseInt(selectedGuests);
            });

      // Apply price filter
      const filteredPrice =
        selectedPrice === "featured"
          ? filteredGuests
          : [...filteredGuests].sort((a, b) => {
              if (selectedPrice === "low") {
                return a.price - b.price;
              } else if (selectedPrice === "high") {
                return b.price - a.price;
              }
              return 0;
            });

      return filteredPrice;
    }
  }, [selectedType, selectedGuests, selectedPrice]);

  return (
    <div className=" bg-[#FBFBFE]">
      {/* 1. Header & Shadcn Filter Bar */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className=" px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="">
              <Badge
                variant="outline"
                className="text-primary border-primary mb-4 px-3 py-1 uppercase tracking-widest text-[10px]"
              >
                Luxury Living
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
                Accommodations
              </h1>
            </div>

            {/* Shadcn UI Filters */}
            <div className="flex flex-wrap items-center gap-4">
              

              {/* Filter by Category */}
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-40 h-12 rounded-xl bg-white border-slate-200">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="villa">Villas</SelectItem>
                  <SelectItem value="suite">Suites</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter by Guests - New Feature */}
              <Select
                value={selectedGuests}
                onValueChange={(value) => setSelectedGuests(value)}
              >
                <SelectTrigger className="w-40 h-12 rounded-xl bg-white border-slate-200">
                  <SelectValue placeholder="Guest Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Guests</SelectItem>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedPrice}
                onValueChange={(value) => setSelectedPrice(value)}
              >
                <SelectTrigger className="w-40 h-12 rounded-xl bg-white border-slate-200">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <ResetFilters
                onReset={() => {
                  setSelectedType("all");
                  setSelectedGuests("0");
                  setSelectedPrice("featured");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Responsive Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomsVillasSection;
