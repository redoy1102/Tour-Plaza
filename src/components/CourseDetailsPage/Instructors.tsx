import { BadgeCheck } from "lucide-react";
import { featuredCourses } from "@/data/landingPage/featuredCoursesData";

export interface InstructorsProps {
  courseId: string | undefined;
}

const Instructors = ({ courseId }: InstructorsProps) => {
  const course = featuredCourses.find((c) => c.id === Number(courseId));

  if (!course || !course.instructors) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 md:px-12 xl:px-4 pb-16">
      <h2 className="text-2xl md:text-3xl text-center font-black text-[#FCAF17] font-bengali uppercase mb-8">
        ইন্সট্রাক্টর
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {course.instructors.map((instructor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden h-full group transition-all duration-300 hover:shadow-lg"
          >
            {/* Top Row: Badge and Photo */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 pr-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-dashed border-purple-200 bg-white text-purple-600 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <BadgeCheck className="w-4 h-4" />
                  Lead Instructor
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  {instructor.name}
                </h3>
              </div>
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="w-full h-full object-cover  transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Role / Experience */}
            <div className="flex-1">
              <p className="text-slate-700 text-[15px] leading-relaxed font-medium text-justify">
                {instructor.role} at {instructor.runningCompanyName}. এটি একটি
                সম্পূর্ণ গাইডলাইন যা আপনাকে শূন্য থেকে শুরু করে প্রফেশনাল
                পর্যায়ে নিয়ে যাবে। পাইথন বর্তমানে AI এবং ডাটা সায়েন্সের প্রধান
                ভাষা।
              </p>
            </div>

            {/* Company Bar - Mocking the logo area */}
            <div className="mt-4 bg-slate-50 -mx-6 -mb-6 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black italic text-slate-400 opacity-50 tracking-tighter uppercase">
                  {instructor.runningCompanyName.split(" ")[0]}
                </span>
                <div className="h-6 w-px bg-slate-200" />
                <span className="text-sm font-bold text-slate-900">
                  {instructor.runningCompanyName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;
