// import { courses } from "@/data/landingPage/courses";
import {
  Star,
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
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import {
  searchPromoCodeSchema,
  type SearchPromoCodeFormValue,
} from "@/schemas/admin/promoCode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

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
  // const { register, getValues, reset } = useForm();

  const handleEnroll = () => {
    const promoQuery = selectedPromoCode ? `?promo=${selectedPromoCode}` : "";
    navigate(`/purchase/${courseId}${promoQuery}`);
  };

  // promo code submission logic
  const form = useForm<SearchPromoCodeFormValue>({
    resolver: zodResolver(searchPromoCodeSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });
  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = (data: SearchPromoCodeFormValue) => {
    const inputPromoCode = data.code;
    const isPromoCodeExist = promoCodes.find((p) => p.code === inputPromoCode);
    if (isPromoCodeExist) {
      setSelectedPromoCode(isPromoCodeExist.code);
      toast.success("Promo code applied successfully!", {
        duration: 3000,
      });
    } else {
      toast.error("Invalid promo code", {
        duration: 3000,
      });
    }

    form.reset();
  };

  const [placeholder, setPlaceholder] = useState("");
  const fullText = "welcome25"; // আপনি যা টাইপ করাতে চান

  useEffect(() => {
    let index = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = fullText.substring(0, index);
      setPlaceholder(currentText);

      if (!isDeleting && index < fullText.length) {
        index++;
        setTimeout(type, 150); // টাইপিং স্পিড
      } else if (isDeleting && index > 0) {
        index--;
        setTimeout(type, 120); // ডিলিটিং স্পিড
      } else {
        // বিরতি দিয়ে আবার শুরু করা
        isDeleting = !isDeleting;
        setTimeout(type, 1000);
      }
    };

    type();
  }, []);

  if (!course) {
    return <div className="py-20 text-center">কোর্স পাওয়া যায়নি।</div>;
  }

  const priceAfterDiscount = course?.price
    ? course.price - (course.discount ?? 0)
    : 0;
  console.log("Price after discount:", priceAfterDiscount);

  const promo = promoCodes.find((p) => p.code === selectedPromoCode);
  const promoNumber = promo ? promo.discountPercentage : 0;

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
            {/* Pricing and Action Section */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 my-4">
              {/* Batch Admission Button */}
              <Button
                onClick={handleEnroll}
                className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-slate-900 font-bold h-12 px-8 rounded-xl text-lg flex items-center gap-2 transition-transform active:scale-95"
              >
                ব্যাচে ভর্তি হোন <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Price Display */}
              {course?.price && (
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-2 h-7">
                    <span className="text-3xl font-black text-slate-900">
                      ৳{finalPrice}
                    </span>
                    {finalPrice < course.price && (
                      <span className="text-lg text-slate-400 line-through">
                        ৳{course.price}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Applied Promo Code Display (Fixed Height to match input) */}
              {selectedPromoCode && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 h-12 px-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold text-sm uppercase tracking-tight">
                      {selectedPromoCode} Applied
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPromoCode("")}
                    className="ml-2 p-1 hover:bg-emerald-100 rounded-full text-emerald-600 transition-colors cursor-pointer"
                    title="Remove Promo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Promo Code Input Group */}
              {promoCodes && selectedPromoCode === "" && (
                <div className="flex-1 min-w-[280px] max-w-[320px]">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <div className="flex -space-x-px shadow-sm rounded-lg overflow-hidden group">
                              <FormControl>
                                <Input
                                  // placeholder="প্রোমো কোড"
                                  placeholder={placeholder}
                                  className="h-11 rounded-none rounded-l-lg border-slate-200 focus-visible:ring-0 focus-visible:border-slate-400 focus-visible:ring-offset-0 transition-all placeholder:text-slate-400"
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                disabled={isSubmitting || !isDirty}
                                className="h-11 mt-1 rounded-none rounded-r-lg bg-slate-900 hover:bg-black text-white px-5 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                              >
                                {isSubmitting ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                                ) : (
                                  <Search className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            {/* Fixed Error Message positioning */}
                            <div className="h-0 relative">
                              <FormMessage className="text-[11px] absolute top-1 left-1 font-medium" />
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
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
