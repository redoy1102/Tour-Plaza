import Header from "@/components/shared/Header";
import { PlaySquare } from "lucide-react";
import { courses } from "@/data/landingPage/courses";
import CourseCard from "@/components/landingPage/CoursesSection/CourseCard";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const AllCoursesPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Filter courses based on category parameter
  const filteredCourses = useMemo(() => {
    if (!categoryParam) {
      return courses;
    }
    return courses.filter((course) => course.category === categoryParam);
  }, [categoryParam]);

  // Get category title for header
  const getCategoryTitle = () => {
    const categoryTitles: Record<string, string> = {
      webDevelopment: "ওয়েব ডেভেলপমেন্ট",
      graphicDesign: "গ্রাফিক ডিজাইন",
      digitalMarketing: "ডিজিটাল মার্কেটিং",
      videoEditing: "ভিডিও এডিটিং",
      itSupport: "আইটি সাপোর্ট",
      appDevelopment: "অ্যাপ ডেভেলপমেন্ট",
      "3DAnimation": "3D অ্যানিমেশন",
      dataEngineering: "ডাটা ইঞ্জিনিয়ারিং",
      artificialIntelligence: "কৃত্রিম বুদ্ধিমত্তা",
    };
    return categoryParam && categoryTitles[categoryParam]
      ? categoryTitles[categoryParam]
      : "সব";
  };

  return (
    <div className="container mx-auto px-4 md:px-12 xl:px-4 py-10 md:py-20">
      <Header
        icon={PlaySquare}
        colorText={getCategoryTitle()}
        description="যে কোনো সময়, যে কোনো জায়গা থেকে আমাদের রেকর্ডেড লাইভ ক্লাস দেখুন এবং পুনরায় শিখুন আপনার সুবিধামতো।"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((singleCourse, index) => (
            <CourseCard key={index} singleCourse={singleCourse} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-600">
              এই ক্যাটাগরিতে কোনো কোর্স পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
