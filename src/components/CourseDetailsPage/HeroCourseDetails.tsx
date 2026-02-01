import { featuredCourses } from "@/data/landingPage/featuredCoursesData";
import {
  Star,
  PlayCircle,
  Calendar,
  Users,
  Clock,
  Radio,
  CheckCircle,
  Tag,
  ArrowRight,
  Monitor,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/data/landingPage/featuredCoursesData";
import CourseOutline from "../CourseDetailsPage/CourseOutline";
import Instructors from "../CourseDetailsPage/Instructors";

interface HeroCourseDetailsProps {
  courseId: string | undefined;
}

const HeroCourseDetails = ({ courseId }: HeroCourseDetailsProps) => {
  console.log("Type of course id:", typeof courseId);
  const course = featuredCourses.find((c) => c.id === Number(courseId));

  if (!course) {
    return <div className="py-20 text-center">কোর্স পাওয়া যায়নি।</div>;
  }

  // Calculate a mock original price
  const originalPrice = course.price + 3400;

  // Function to parse Bengali date
  const parseBengaliDate = (dateStr: string): Date | null => {
    const parts = dateStr.split(" ");
    if (parts.length < 3) return null;
    const datePart = parts[1];
    const monthPart = parts[2];
    // Convert Bengali numerals to English
    const bengaliToEnglish: { [key: string]: string } = {
      "০": "0",
      "১": "1",
      "২": "2",
      "৩": "3",
      "৪": "4",
      "৫": "5",
      "৬": "6",
      "৭": "7",
      "৮": "8",
      "৯": "9",
    };
    let englishDate = "";
    for (const char of datePart) {
      englishDate += bengaliToEnglish[char] || char;
    }
    const dateNum = parseInt(englishDate, 10);
    if (isNaN(dateNum)) return null;
    const monthMap: { [key: string]: number } = {
      জানুয়ারি: 1,
      ফেব্রুয়ারি: 2,
      মার্চ: 3,
      এপ্রিল: 4,
      মে: 5,
      জুন: 6,
      জুলাই: 7,
      আগস্ট: 8,
      সেপ্টেম্বর: 9,
      অক্টোবর: 10,
      নভেম্বর: 11,
      ডিসেম্বর: 12,
    };
    const month = monthMap[monthPart];
    if (month === undefined) return null;
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, month - 1, dateNum);
    const now = new Date();
    if (startDate < now) {
      startDate.setFullYear(currentYear + 1);
    }
    return startDate;
  };

  const startDate = parseBengaliDate(course.batchStartDate);
  const now = new Date();
  const diffTime = startDate ? startDate.getTime() - now.getTime() : 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, diffDays);

  return (
    <section className="bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-12 xl:px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-3/5 space-y-2">
            <div className="flex items-center justify-between">
              {/* Live Course Badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-3 rounded-full text-sm font-semibold">
                <Radio className="w-4 h-4" />
                লাইভ কোর্স
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-sm font-bold">
                  {course.rating} <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-slate-500 text-sm italic">
                  ({course.reviews.length} Ratings)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-xl lg:text-3xl font-bold text-slate-900 leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-md leading-relaxed max-w-2xl">
              {course.description} এটি একটি সম্পূর্ণ গাইডলাইন যা আপনাকে শূন্য
              থেকে শুরু করে প্রফেশনাল পর্যায়ে নিয়ে যাবে। পাইথন বর্তমানে AI এবং
              ডাটা সায়েন্সের প্রধান ভাষা। তাই নিজেকে ভবিষ্যতের জন্য দক্ষ করতে
              আজই যোগ দিন।
            </p>

            {/* Pricing and Action */}
            <div className="flex flex-wrap items-center gap-4 py-4">
              <Button className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-slate-900 font-bold px-8 py-6 rounded-lg text-lg flex items-center gap-2">
                ব্যাচে ভর্তি হোন <ArrowRight className="w-5 h-5" />
              </Button>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ৳{course.price.toLocaleString()}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  ৳{originalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" /> প্রোমো অ্যাপ্লাইড
                </span>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md text-sm font-bold border border-emerald-100 uppercase">
                  {course.promoCodes[0]}
                </span>
              </div>
            </div>

            {/* Stat Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                <Radio className="w-4 h-4 text-emerald-600" />
                <span>{course.totalLiveClasses} টি লাইভ ক্লাস</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>
                  {course.totalPreRecordedVideos} টি প্রি রেকর্ডেড ভিডিও
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>{remainingDays} দিন বাকি</span>
              </div>
            </div>

            {/* Extra Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {course.supports.map((support, idx) => {
                const IconComponent = getIcon(support.icon);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white border border-emerald-100 px-2 py-1 rounded-md text-emerald-700 font-medium shadow-sm text-sm"
                  >
                    <IconComponent className="w-5 h-5" />
                    {support.title}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Video Preview */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
              <img
                src={course.imglink}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 p-5 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                  <PlayCircle className="w-12 h-12 text-rose-500 fill-rose-500/20" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
                <PlayCircle className="w-5 h-5 text-orange-400" />
                ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-10 bg-white rounded-2xl p-3 md:p-4 shadow border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-x divide-slate-100">
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium">ব্যাচ শুরু</p>
              <p className="text-slate-900 font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                {course.batchStartDate}
              </p>
            </div>
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-500" />
                লাইভ ক্লাস
              </p>
              <p className="text-slate-900 font-bold text-sm leading-tight">
                {course.liveClassTime} (রবি,মঙ্গল,বৃহ)
              </p>
            </div>
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                সাপোর্ট ক্লাস
              </p>
              <p className="text-slate-900 font-bold text-sm leading-tight">
                প্রতিদিন রাত {course.supportClassTime}
              </p>
            </div>
            <div className="px-4 space-y-2 border-none lg:border-solid">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Tag className="w-4 h-4 text-rose-500" />
                সিট বাকি
              </p>
              <p className="text-slate-900 font-bold text-xl">
                {course.seatsLeft} টি
              </p>
            </div>
            <div className="px-4 space-y-2 border-none lg:border-solid">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                ভর্তি চলছে
              </p>
              <p className="text-slate-900 font-extrabold text-xl font-bengali text-slate-900">
                {course.batch}
              </p>
            </div>
          </div>
        </div>

        <CourseOutline courseId={courseId} />

        <Instructors courseId={courseId} />
      </div>
    </section>
  );
};

export default HeroCourseDetails;
