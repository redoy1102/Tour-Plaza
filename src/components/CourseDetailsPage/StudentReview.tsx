import { featuredCourses } from "@/data/landingPage/courses";
import { Star, MessageSquareQuote } from "lucide-react";

interface StudentReviewProps {
  courseId: string | undefined;
}

const StudentReview = ({ courseId }: StudentReviewProps) => {
  const course = featuredCourses.find((c) => c.id === Number(courseId));

  if (!course || !course.reviews || course.reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <MessageSquareQuote className="w-4 h-4" />
          শিক্ষার্থীদের মতামত
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          কোর্সটি নিয়ে আমাদের শিক্ষার্থীদের প্রতিক্রিয়া
        </h2>
        <p className="text-slate-600 max-w-2xl">
          আমাদের কোর্সে যুক্ত হয়ে ছাত্ররা ক্যারিয়ারের নতুন দিগন্ত উন্মোচন
          করেছেন। তাদের মুখ থেকেই শুনুন তাদের অভিজ্ঞতার কথা।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(review.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-200 fill-slate-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-slate-700">
                  {review.rating}
                </span>
              </div>
              <p className="text-slate-600 italic leading-relaxed mb-6 relative">
                <span className="text-4xl text-emerald-100 absolute -top-4 -left-2 z-0 font-serif leading-none">
                  "
                </span>
                <span className="relative z-10">{review.comment}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                {review.studentName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 leading-tight">
                  {review.studentName}
                </h4>
                <p className="text-xs text-slate-400">ভেরিফাইড শিক্ষার্থী</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stat */}
      <div className="mt-12 p-8 bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">
              এভারেজ রেটিং
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span className="text-2xl md:text-4xl font-black">
                {course.rating}
              </span>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  {course.reviews.length} জন রেটিং দিয়েছেন
                </span>
              </div>
            </div>
          </div>
          {/* <div className="h-12 w-px bg-slate-700 hidden md:block"></div> */}
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">
              সফল গ্রাজুয়েট
            </p>
            <p className="text-3xl font-black">৫০০+</p>
          </div>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 active:scale-95">
          এখনই শুরু করুন
        </button>
      </div>
    </section>
  );
};

export default StudentReview;
