import CourseSeeBtn from "@/lib/CourseSeeBtn";
import EnrollNowBtn from "@/lib/EnrollNowBtn";

const HeroContent = () => {
  return (
    <div className="space-y-5">
      <div className="inline-block">
        <div className="bg-[#1e3a5f] text-white px-6 py-2 rounded-full text-sm flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
          </span>

          <span>শুধু ডিগ্রিই নয়, দক্ষতাই ভবিষ্যৎ!</span>
        </div>
      </div>

      <h1 className="text-2xl md:text-5xl lg:text-4xl font-bold text-gray-900 leading-tight">
        আমাদের সাথে শুরু করো তোমার দক্ষতা বাড়ানোর যাত্রা এবং তৈরি করো{" "}
        <span className="text-red-500">একজন সফল প্রফেশনাল</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
        eManager IT Institute বাস্তব প্রকল্প-ভিত্তিক প্রশিক্ষণের মাধ্যমে
        ভবিষ্যতের IT পেশাদারদের ক্ষমতায়ন ওয়েব ডিজাইন, ওয়েব ডেভেলপমেন্ট,
        ডিজিটাল মার্কেটিং এবং গ্রাফিক ডিজাইনের পেশাদার কোর্স শিখু বিশেষজ্ঞদের
        কাছ থেকে শিখুন এবং চাকরির জন্য প্রস্তুত দক্ষতা দিয়ে আপনার ক্যারিয়ার
        গড়ুন।
      </p>

      <div className="flex flex-wrap gap-4">
        <CourseSeeBtn />
        <EnrollNowBtn />
      </div>
    </div>
  );
};

export default HeroContent;
