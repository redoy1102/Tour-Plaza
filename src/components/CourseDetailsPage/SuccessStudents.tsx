import { featuredCourses } from "@/data/landingPage/courses";

interface SuccessStudentsProps {
  courseId: string | undefined;
}

// Moved data outside to avoid re-creation on every render
const students = [
  {
    name: "আরিফুর রহমান",
    role: "Software Engineer",
    company: "Enosis Solutions",
    image: "/public/aboutPage/successStudents/successStudens_1.jpg",
  },
  {
    name: "তানজিলা আক্তার",
    role: "UI/UX Designer",
    company: "Creative IT",
    image: "/public/aboutPage/successStudents/successStudens_2.jpg",
  },
  {
    name: "রাহাত হোসেন",
    role: "Web Developer",
    company: "WellDev",
    image: "/public/aboutPage/successStudents/successStudens_3.jpg",
  },
  {
    name: "সাদিয়া ইসলাম",
    role: "Frontend Developer",
    company: "Xbit Studio",
    image: "/public/aboutPage/successStudents/successStudens_4.jpg",
  },
];

const SuccessStudents = ({ courseId }: SuccessStudentsProps) => {
  const course = featuredCourses.find((c) => c.id === Number(courseId));

  if (!course) {
    return null;
  }

  return (
    <section className="pb-16 bg-slate-50/50 rounded-3xl px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-orange-400 font-bengali uppercase">
            সফল শিক্ষার্থী
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            আমাদের কোর্স শেষ করে যারা বর্তমানে দেশি-বিদেশি নামকরা প্রতিষ্ঠানে
            কর্মরত আছেন। তাদের সফলতা আমাদের অনুপ্রেরণা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {students.map((student, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-100/30 transition-[transform,shadow] duration-300 will-change-transform"
            >
              {/* Image Container */}
              <div className="aspect-4/5 overflow-hidden bg-slate-100 relative">
                <img
                  src={student.image}
                  alt={student.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/219/219983.png";
                  }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-emerald-900/90 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 will-change-opacity">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                      Success Story
                    </p>
                    <p className="text-white text-sm font-medium italic opacity-90">
                      Currently working at {student.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Content Below */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                  {student.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  {student.role}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {student.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <button className="bg-white border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 shadow-sm">
            আরও সফল শিক্ষার্থীদের দেখুন
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default SuccessStudents;
