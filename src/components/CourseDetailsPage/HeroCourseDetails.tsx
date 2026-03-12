// import { courses } from "@/data/landingPage/courses";
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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import { getYouTubeEmbedUrl } from "@/lib/utils";

interface HeroCourseDetailsProps {
  courseId: string | undefined;
}

const HeroCourseDetails = ({ courseId }: HeroCourseDetailsProps) => {
  const navigate = useNavigate();
  // const promoCodes =
  const promoCodes = useAppSelector((state) => state.promoCodes.items);
  const courses = useAppSelector((state) => state.courses.items);
  const course = courses.find((c) => c.id === courseId);
  const [selectedPromoCode, setSelectedPromoCode] = useState<string>("");

  const handleEnroll = () => {
    const promoQuery = selectedPromoCode ? `?promo=${selectedPromoCode}` : "";
    navigate(`/purchase/${courseId}${promoQuery}`);
  };

  if (!course) {
    return <div className="py-20 text-center">কোর্স পাওয়া যায়নি।</div>;
  }

  const priceAfterDiscount = course?.price
    ? course.price - (course.discount ?? 0)
    : 0;
  console.log("Price after discount:", priceAfterDiscount);

  const promoNumber = selectedPromoCode ? parseInt(selectedPromoCode, 10) : 0;

  const finalPrice =
    priceAfterDiscount - (priceAfterDiscount * promoNumber) / 100;

  // Function to parse Bengali date
  const parseBengaliDate = (dateInput: string | Date): Date | null => {
    if (dateInput instanceof Date) return dateInput;
    const dateStr = dateInput as string;
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

  const startDate = parseBengaliDate(course?.startDate ?? "");
  const now = new Date();
  const diffTime = startDate ? startDate.getTime() - now.getTime() : 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, diffDays);

  return (
    <section>
      <div>
        <div className="flex flex-col lg:flex-row lg:gap-4 xl:gap-12 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-3/5 space-y-2">
            <div className="flex items-center justify-between">
              {/* Live Course Badge */}
              <div
                className={`inline-flex items-center gap-2 p-1 bg-red-50 ${
                  course?.isLiveCourse ? "text-green-500" : "text-red-500"
                } px-3 rounded-full text-sm font-semibold`}
              >
                <Radio className="w-4 h-4" />
                {course?.isLiveCourse ? "লাইভ কোর্স" : "প্রি-রেকর্ডেড কোর্স"}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-slate-500 text-sm italic">
                  {/* ({course.reviews.length} Ratings) */}5
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-md md:text-sm leading-relaxed max-w-2xl">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: course?.description ?? "",
                }}
              />
            </p>

            {/* Pricing and Action */}
            <div className="flex flex-wrap items-center gap-4 py-4">
              <Button
                onClick={handleEnroll}
                className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-slate-900 font-bold px-4 py-3 lg:px-6 lg:py-5 xl:px-8 xl:py-6 rounded-lg text-lg flex items-center gap-2"
              >
                ব্যাচে ভর্তি হোন <ArrowRight className="w-5 h-5" />
              </Button>

              {course?.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-2xl font-black text-slate-900">
                    ৳{finalPrice}
                  </span>
                  {finalPrice < course.price && (
                    <span className="text-lg text-slate-400 line-through">
                      ৳{course.price}
                    </span>
                  )}
                </div>
              )}

              {selectedPromoCode && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> প্রোমো অ্যাপ্লাইড
                  </span>
                  <Button
                    size="sm"
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 cursor-pointer"
                    onClick={() => setSelectedPromoCode("")}
                  >
                    <X />
                    Promo
                  </Button>
                </div>
              )}
              {/* Promo Code Selector */}
              {promoCodes && selectedPromoCode === "" && (
                <Select
                  value={selectedPromoCode}
                  onValueChange={setSelectedPromoCode}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="প্রমো কোড" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>প্রমো কোড</SelectLabel> */}
                      {promoCodes.map((item) => (
                        <SelectItem
                          key={item.code}
                          value={item.discountPercentage.toString()}
                        >
                          {item.code} - {item.discountPercentage}%
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Stat Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {course?.totalLiveClasses && (
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                  <Radio className="w-4 h-4 text-emerald-600" />
                  <span>{course.totalLiveClasses} টি লাইভ ক্লাস</span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>
                  {course.totalPreRecordedClasses} টি প্রি রেকর্ডেড ভিডিও
                </span>
              </div>
              {!course?.isPreRecordedCourse && (
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 shadow-sm">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{remainingDays} দিন বাকি</span>
                </div>
              )}
            </div>

            {/* Extra Features */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-4">
              {course?.supports?.map((support, idx) => {
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
            </div> */}
          </div>

          {/* Right Video Preview */}
          <div className="w-full lg:w-2/5 flex flex-col items-center mt-4">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
              {/* <img
                src={course.bannerImage}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              /> */}
              <iframe
                src={getYouTubeEmbedUrl(course?.bannerVideoLink)}
                title={course?.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 p-5 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                  <PlayCircle className="w-12 h-12 text-rose-500 fill-rose-500/20" />
                </div>
              </div> */}
              {/* <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white rounded-xl flex items-center gap-2 text-sm font-medium">
                <PlayCircle className="w-5 h-5 text-orange-400" />
                ক্লিক করে দেখে নিন কোর্সের ডেমো ক্লাস
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-10 bg-white rounded-2xl p-3 md:p-4 shadow border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-x divide-slate-100">
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium">ব্যাচ শুরু</p>
              <p className="text-slate-900 md:text-sm font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                {course.startDate
                  ? // If it's a string from Redux-Persist, convert it to a Date object first
                    format(new Date(course.startDate), "dd/MM/yyyy")
                  : "TBA"}
              </p>
            </div>
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-500" />
                লাইভ ক্লাস
              </p>
              <div className="space-y-1">
                {Array.isArray(course.liveClassTime) &&
                course.liveClassTime.length > 0 ? (
                  course.liveClassTime.map((time, idx) => (
                    <p
                      key={idx}
                      className="text-slate-900 text-xs font-bold leading-tight"
                    >
                      {time.day}: {time.startTime} - {time.endTime}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-900 md:text-sm font-bold leading-tight">
                    TBA
                  </p>
                )}
              </div>
            </div>
            <div className="px-4 space-y-2">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                সাপোর্ট ক্লাস
              </p>
              <div className="space-y-1">
                {Array.isArray(course.supportClassTime) &&
                course.supportClassTime.length > 0 ? (
                  course.supportClassTime.map((time, idx) => (
                    <p
                      key={idx}
                      className="text-slate-900 text-xs font-bold leading-tight"
                    >
                      {time.day}: {time.startTime} - {time.endTime}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-900 md:text-sm font-bold leading-tight">
                    TBA
                  </p>
                )}
              </div>
            </div>
            <div className="px-4 space-y-2 border-none lg:border-solid">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Tag className="w-4 h-4 text-rose-500" />
                সিট বাকি
              </p>
              <p className="text-slate-900 md:text-sm font-bold text-xl">
                {/* {course.seatsLeft} টি */}
                10 টি
              </p>
            </div>
            <div className="px-4 space-y-2 border-none lg:border-solid">
              <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                ভর্তি চলছে
              </p>
              <p className="text-slate-900 md:text-sm font-extrabold text-xl font-bengali text-slate-900">
                {course.batchNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCourseDetails;
