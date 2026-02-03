import Header from "@/components/shared/Header";
import { PlaySquare } from "lucide-react";
import { courses } from "@/data/landingPage/courses";
import CourseCard from "@/components/landingPage/CoursesSection/CourseCard";

const AllCoursesPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-12 xl:px-4 py-10 md:py-20">
      <Header
        icon={PlaySquare}
        normalText="All"
        colorText="Courses"
        description="যে কোনো সময়, যে কোনো জায়গা থেকে আমাদের রেকর্ডেড লাইভ ক্লাস দেখুন এবং পুনরায় শিখুন আপনার সুবিধামতো।"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((singleCourse, index) => (
          <CourseCard key={index} singleCourse={singleCourse} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AllCoursesPage;
