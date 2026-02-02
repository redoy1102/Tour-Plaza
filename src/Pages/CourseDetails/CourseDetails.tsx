import { useParams } from "react-router-dom";
import HeroCourseDetails from "@/components/CourseDetailsPage/HeroCourseDetails";
import CourseOutline from "@/components/CourseDetailsPage/CourseOutline";
import Instructors from "@/components/CourseDetailsPage/Instructors";
import Tools from "@/components/CourseDetailsPage/Tools";
import Prerequisites from "@/components/CourseDetailsPage/Prerequisites";
import SuccessStudents from "@/components/CourseDetailsPage/SuccessStudents";
import Faq from "@/components/CourseDetailsPage/Faq";
import StudentReview from "@/components/CourseDetailsPage/StudentReview";

const CourseDetails = () => {
  const { courseId } = useParams();

  return (
    <div className="bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-12 xl:px-4">
        <HeroCourseDetails courseId={courseId} />
        <CourseOutline courseId={courseId} />
        <Instructors courseId={courseId} />
        <Tools courseId={courseId} />
        <Prerequisites courseId={courseId} />
        <SuccessStudents courseId={courseId} />
        <Faq courseId={courseId} />
        <StudentReview courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseDetails;
