import { useAppSelector } from "@/Redux/hooks";
import { CheckCircle2 } from "lucide-react";
import { getIcon } from "@/data/icons";

interface PrerequisitesProps {
  courseId: string | undefined;
}

const Prerequisites = ({ courseId }: PrerequisitesProps) => {
  const courses = useAppSelector((state) => state.courses.items);
  const prerequisites = useAppSelector((state) => state.prerequisites.items);
  const course = courses.find((c) => c.id === courseId);

  // build list of prerequisite objects referenced by the course
  const coursePrereqs =
    course?.prerequisitesIds?.map((id) =>
      prerequisites.find((p) => p.id === id)
    ) || [];

  if (!course || coursePrereqs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Side: Title & Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-bengali">
              কোর্সটি করার জন্য কি কি প্রয়োজন?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              এই কোর্সটি সফলভাবে শেষ করার জন্য আপনার কিছু বেসিক জিনিসের প্রয়োজন
              হবে। চিন্তার কিছু নেই, আমরা সবকিছু সহজভাবে সাজিয়েছি যাতে আপনি
              অনায়াসেই শিখতে পারেন।
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>স্থির ইন্টারনেট কানেকশন</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-600 font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>শেখার মানসিকতা</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-600 font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>প্রতিদিন ২-৩ ঘণ্টা সময়</span>
              </div>
            </div>
          </div>

          {/* Right Side: Prerequisite Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coursePrereqs.map((item, index) => {
              if (!item) return null;
              const IconComponent = getIcon(item.icon);
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prerequisites;
