import CourseSeeBtn from "@/lib/CourseSeeBtn";
import EnrollNowBtn from "@/lib/EnrollNowBtn";

const AboutContent = () => {
  return (
    <div className="space-y-5">
      <h2 className="mb-7 text-4xl font-bold text-gray-900">
        আমরা তৈরি করি{" "}
        <span className="text-secondary"> দক্ষ ও আত্মবিশ্বাসী </span>প্রফেশনাল
      </h2>

      <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
        আমাদের লক্ষ্য শুধু কোর্স করানো নয়, বরং বাস্তব অভিজ্ঞতার মাধ্যমে আপনাকে
        ইন্ডাস্ট্রি-র জন্য সম্পূর্ণভাবে প্রস্তুত করা। আমরা বিশ্বাস করি, শুধু
        থিওরি জানলেই যথেষ্ট নয়—বাস্তব প্রজেক্ট, লাইভ প্র্যাকটিস এবং বাস্তব
        সমস্যার সমাধানই একজন শিক্ষার্থীকে আত্মবিশ্বাসী প্রফেশনাল হিসেবে গড়ে
        তোলে। <br /> <br /> তাই আমাদের প্রতিটি কোর্স ডিজাইন করা হয়েছে লাইভ ক্লাস, হাই-কোয়ালিটি
        রেকর্ডেড কনটেন্ট, প্রজেক্ট-ভিত্তিক লার্নিং এবং জব-রেডি সাপোর্টকে একসাথে
        মিলিয়ে। কোর্স চলাকালীন ও কোর্স শেষে আমরা পাশে থাকি ক্যারিয়ার গাইডলাইন,
        স্কিল এসেসমেন্ট এবং বাস্তব কাজের অভিজ্ঞতা অর্জনের সুযোগ নিয়ে—সবকিছু এক
        জায়গায়।
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
        <CourseSeeBtn />
        <EnrollNowBtn />
      </div>
    </div>
  );
};

export default AboutContent;
