import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react";
import Header from "@/components/shared/Header";
// import Course from "./Course";
import CourseCard from "./CourseCard";
import { useAppSelector } from "@/Redux/hooks";

const LeftRightButton = ({
  direction,
  scroll,
}: {
  direction: "left" | "right";
  scroll: (direction: "left" | "right") => void;
}) => {
  return (
    <button
      onClick={() => scroll(direction)}
      className="flex h-6 w-6 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border cursor-pointer"
    >
      {direction === "left" ? (
        <ChevronLeft className="h-6 w-6 lg:h-4 lg:w-4" />
      ) : (
        <ChevronRight className="h-6 w-6 lg:h-4 lg:w-4" />
      )}
    </button>
  );
};

interface CoursesProps {
  isFeatured?: boolean;
  isLiveCourse?: boolean;
  isPreRecordedCourse?: boolean;
}

const Courses = ({
  isFeatured,
  isLiveCourse,
  isPreRecordedCourse,
}: CoursesProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  console.log("Active category:", activeCategory);

  const courses = useAppSelector((state) => state.courses.items);
  console.log("All the courses:", courses);

  const categories = useAppSelector((state) => state.categories.items);
  console.log("All the categories:", categories);

  const requestedCourses = isFeatured
    ? courses.filter((course) => course.isFeatured)
    : isLiveCourse
      ? courses.filter((course) => course.isLiveCourse)
      : isPreRecordedCourse
        ? courses.filter((course) => course.isPreRecordedCourse)
        : [];

  if (!requestedCourses) return null;

  // Scroll handler
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 200;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Filtered courses
  const filteredCourses = activeCategory
    ? requestedCourses.filter((course) => course.categoryId === activeCategory)
    : requestedCourses;

  return (
    <section className="container mx-auto px-4 md:px-12 xl:px-4 py-16">
      {/* Header */}
      <Header
        icon={MonitorPlay}
        normalText={
          isFeatured ? "Featured" : isLiveCourse ? "Live" : "Pre-recorded"
        }
        colorText="Courses"
        description={
          isFeatured
            ? "Explore our top-rated courses and enhance your skills."
            : isLiveCourse
              ? "Join our live courses and interact with instructors in real-time."
              : "Access our pre-recorded courses and learn at your own pace."
        }
      />

      {/* Categories */}
      <div className="mb-10 flex items-center gap-3">
        {/* Left button */}
        <LeftRightButton direction="left" scroll={scroll} />

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide"
        >
          {/* All */}
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition cursor-pointer ${
              activeCategory === null
                ? "bg-secondary text-white"
                : "text-gray-700 "
            }`}
          >
            All Courses
          </button>

          {categories.map(
            (cat: { id: string; name: string; label: string }) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-secondary text-white"
                    : "text-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ),
          )}
        </div>

        {/* Right button */}
        <LeftRightButton direction="right" scroll={scroll} />
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((singleCourse, index) => (
          <CourseCard key={index} singleCourse={singleCourse} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
