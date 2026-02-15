import HeroSection from "@/components/landingPage/Hero Section/HeroSection";
import StatsSection from "@/components/landingPage/Stats Section/StatsSection";
import AboutSection from "@/components/landingPage/About Section/AboutSection";
import AppSection from "@/components/landingPage/MobileAppSection/AppSection";
import WhyChooseSection from "@/components/landingPage/WhyChooseSection/WhyChooseSection";
import Courses from "@/components/landingPage/CoursesSection/CoursesSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <Courses isFeatured={true} />
      <Courses isFreeCourses={true} />
      <WhyChooseSection />
      <AboutSection 
        beforeColorText="আমরা তৈরি করি"
        colorText="দক্ষ ও আত্মবিশ্বাসী"
        afterColorText="প্রফেশনাল"
        description={
          <>
            আমাদের লক্ষ্য শুধু কোর্স করানো নয়, বরং বাস্তব অভিজ্ঞতার মাধ্যমে
            আপনাকে ইন্ডাস্ট্রি-র জন্য সম্পূর্ণভাবে প্রস্তুত করা। আমরা
            বিশ্বাস করি, শুধু থিওরি জানলেই যথেষ্ট নয়—বাস্তব প্রজেক্ট, লাইভ
            প্র্যাকটিস এবং বাস্তব সমস্যার সমাধানই একজন শিক্ষার্থীকে
            আত্মবিশ্বাসী প্রফেশনাল হিসেবে গড়ে তোলে। <br /> <br /> তাই আমাদের
            প্রতিটি কোর্স ডিজাইন করা হয়েছে লাইভ ক্লাস, হাই-কোয়ালিটি রেকর্ডেড
            কনটেন্ট, প্রজেক্ট-ভিত্তিক লার্নিং এবং জব-রেডি সাপোর্টকে একসাথে
            মিলিয়ে। কোর্স চলাকালীন ও কোর্স শেষে আমরা পাশে থাকি ক্যারিয়ার
            গাইডলাইন, স্কিল এসেসমেন্ট এবং বাস্তব কাজের অভিজ্ঞতা অর্জনের
            সুযোগ নিয়ে—সবকিছু এক জায়গায়।
          </>
        }
        imgSrc="/public/landingPage/aboutBanner.webp"
        imgAlt="Banner Image"
        primaryBtn={true}
        secondaryBtn={true}
        bgColor={true}
      />
      <AppSection />
    </div>
  );
};

export default Home;
