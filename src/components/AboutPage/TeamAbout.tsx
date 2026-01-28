

import { useState } from "react";
import { Users, X, Maximize } from "lucide-react";

const TeamAbout = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const teamImages = [
    {
      src: "/aboutPage/team/team.jpg",
      alt: "Team Member 1",
      title: "Our Management Team",
    },
    {
      src: "/aboutPage/team/team2.jpg",
      alt: "Team Member 2",
      title: "Our Instructors",
    },
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
                <Users className="h-4 w-4" />
                <span>Our Team</span>
            </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আমাদের দক্ষ টিম মেম্বারস
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl text-lg">
            আমাদের টিমে রয়েছেন অভিজ্ঞ মেন্টর এবং ইন্ডাস্ট্রি প্রফেশনালস যারা আপনাকে হাতে-কলমে শিখিয়ে দক্ষ করে তুলবে।
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamImages.map((image, index) => (
            <div 
              key={index} 
              className="group flex flex-col overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Full Screen Icon Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                    <Maximize className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              {/* Title below the Image */}
              <div className="bg-white p-4 text-center border-t border-gray-50 uppercase tracking-wide">
                <h3 className="text-gray-900 text-xl font-bold">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="max-w-7xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={selectedImage} 
              alt="Full screen team" 
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamAbout;