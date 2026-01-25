// import StatsCard from "./StatsCard";
import StatsCard from "./StatsCard";
import { Users, Briefcase, Trophy, Network } from "lucide-react";

const statsData = [
  { icon: Users, value: "১০০+", label: "শিক্ষার্থী" },
  { icon: Briefcase, value: "৭৫+", label: "চাকরি পেয়েছেন" },
  { icon: Trophy, value: "৯৫%", label: "চাকরির সাফল্যের হার" },
  { icon: Network, value: "৫০+", label: "অ্যালামনাই নেটওয়ার্ক" },
];

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 pt-10">
      <div className="rounded-2xl border-2 border-blue-400/60 px-8 py-12">
        {/* Title */}
        <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
          কোড থেকে ক্যারিয়ার: আমাদের{" "}
          <span className="text-secondary"> হিরোদের </span>গল্প
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {statsData.map((item, index) => (
            <div key={index} className="relative flex justify-center">
              <StatsCard item={item} />

              {/* Vertical divider */}
              {index !== statsData.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-20 -translate-y-1/2 border-r border-gray-300 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
