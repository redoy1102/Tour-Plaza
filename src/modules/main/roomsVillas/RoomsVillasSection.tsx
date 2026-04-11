import { Badge } from "@/components/ui/badge";
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
import RoomsVillasCard from "./components/RoomsVillasCard";

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
        <div className="container mx-auto">
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

      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomsVillasCard room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomsVillasSection;
