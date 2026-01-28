import { useState } from "react";
import { Trophy, Star, TrendingUp, Maximize } from "lucide-react";
import ImageFullScreen from "../shared/ImageFullScreen";

const StoryAbout = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const successGalleries = [
    {
      src: "/aboutPage/successStudents/successStudens_1.jpg",
      alt: "Success Story 1",
      tag: "Freelancing Success",
    },
    {
      src: "/aboutPage/successStudents/successStudens_2.jpg",
      alt: "Success Story 2",
      tag: "Job Placement",
    },
    {
      src: "/aboutPage/successStudents/successStudens_3.jpg",
      alt: "Success Story 3",
      tag: "Skill Mastery",
    },
    {
      src: "/aboutPage/successStudents/successStudens_4.jpg",
      alt: "Success Story 4",
      tag: "Expert Mentor",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-[#f8fafc] to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-bold mb-6 shadow-sm border border-amber-100">
            <Trophy className="h-4 w-4" />
            <span className="uppercase tracking-widest">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            আমাদের শিক্ষার্থীদের{" "}
            <span className="text-blue-600">সাফল্যের গল্প</span>
          </h2>
          <div className="w-24 h-2 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-3xl text-lg md:text-xl leading-relaxed">
            হাজারো শিক্ষার্থীর স্বপ্ন যখন বাস্তবে রূপ নেয়, তখন আমরা পাই এগিয়ে
            যাওয়ার অনুপ্রেরণা। দেখুন আমাদের সফল শিক্ষার্থীদের কিছু খন্ডচিত্র।
          </p>
        </div>

        {/* Success Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {successGalleries.map((item, index) => (
            <div
              key={index}
              className="group relative h-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImage(item.src)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <div className="p-2 rounded-full bg-blue-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-lg">
                        Student Success
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                      <Maximize className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-md border border-gray-100 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-blue-600 font-bold text-sm tracking-wide">
                  #{index + 1} Success
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <ImageFullScreen 
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </section>
  );
};

export default StoryAbout;
