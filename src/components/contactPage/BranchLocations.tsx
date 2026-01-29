import { MapPin } from "lucide-react";
import { branchOffices } from "@/data/landingPage/contactData";

const BranchLocations = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Our Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchOffices.map((office, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group relative flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {office.title}
                    </h3>
                    <a
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on Google Maps"
                      className="relative p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shrink-0 group/map"
                    >
                      <span className="absolute inset-0 rounded-xl bg-blue-400 opacity-20 animate-ping group-hover/map:hidden"></span>
                      <MapPin className="h-4 w-4 relative z-10" />
                    </a>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[14px]">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default BranchLocations;