import { featuredCourses } from "@/data/landingPage/courses";

interface ToolsProps {
  courseId: string | undefined;
}

const Tools = ({ courseId }: ToolsProps) => {
  const course = featuredCourses.find((c) => c.id === Number(courseId));

  if (!course || !course.toolsList || course.toolsList.length === 0) {
    return <h1>Loading...</h1>;
  }

  // Duplicate the tools array to create a seamless loop
  const duplicatedTools = [
    ...course.toolsList,
    ...course.toolsList,
    ...course.toolsList,
    ...course.toolsList,
  ];

  return (
    <section className="py-20 overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-bengali">
          কোর্সে যে সকল টুলস শিখানো হবে
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          আমরা আপনাকে এই ইন্ডাস্ট্রির সবচেয়ে জনপ্রিয় এবং প্রয়োজনীয় টুলসগুলো
          শিখাবো যাতে আপনি প্রফেশনালি কাজ করতে পারেন।
        </p>
      </div>

      <div className="relative">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10" />

        {/* Marquee Container */}
        <div className="flex animate-marquee">
          {duplicatedTools.map((tool, index) => (
            <div key={index} className="shrink-0 mx-4 group cursor-pointer">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl transition-all duration-300 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-emerald-100/50 group-hover:-translate-y-2 group-hover:border-emerald-100 flex items-center gap-3">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl shadow-sm flex items-center justify-center p-3 mx-auto border border-white group-hover:border-emerald-50 transition-colors">
                  <img
                    src={tool.imgLink}
                    alt={tool.name}
                    className="max-w-full max-h-full object-contain  transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://cdn-icons-png.flaticon.com/512/2111/2111432.png";
                    }}
                  />
                </div>
                <div className="">
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium italic">
                    {tool.purpose}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
