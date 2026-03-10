import { Link } from "react-router-dom";
import type { AddCourseFormValue } from "@/schemas/admin/course.schema";

interface singleCourse extends AddCourseFormValue{
  id: string
}


interface CourseCardProps {
  singleCourse: singleCourse;
  index: number;
  closeSearchResultModal?: () => void;
}

const CourseCard = ({
  singleCourse,
  index,
  closeSearchResultModal,
}: CourseCardProps) => {
  return (
    <div
      key={index}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <Link
        to={`/courses/${singleCourse?.id}`}
        onClick={() => {
          window.scroll(0, 0);
          closeSearchResultModal?.();
        }}
      >
        <img
          src={singleCourse.bannerImage}
          alt={singleCourse.title}
          className="h-44 w-full object-cover"
        />
      </Link>

      <div className="p-3">
        <div className="h-25">
          <Link
            to={`/courses/${singleCourse?.id}`}
            onClick={() => {
              window.scroll(0, 0);
              closeSearchResultModal?.();
            }}
            className="mb-2 text-base font-semibold text-gray-900 h-12"
          >
            {singleCourse.title} কোর্স
          </Link>

          <p className="mb-2 text-xs text-gray-500">
            {singleCourse?.courseDuration
              ? `${singleCourse.courseDuration} মাস | `
              : ""}
            {singleCourse?.totalPreRecordedClasses
              ? `${singleCourse.totalPreRecordedClasses} ভিডিও`
              : ""}
          </p>

          <p className="mb-4 font-semibold text-secondary">
            {singleCourse?.price ? `৳ ${singleCourse.price}` : "ফ্রি কোর্স"}
          </p>
        </div>

        <Link
          to={`/courses/${singleCourse?.id}`}
          onClick={() => {
            window.scroll(0, 0);
            closeSearchResultModal?.();
          }}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          বিস্তারিত দেখুন <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
