import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react";
import Header from "@/components/shared/Header";
// import Course from "./Course";
import { courses } from "@/data/landingPage/courses";
import CourseCard from "./CourseCard";
import { useAppSelector } from "@/Redux/hooks";

interface CoursesProps {
  isFeatured?: boolean;
  isFreeCourses?: boolean;
}

const Courses = ({ isFeatured, isFreeCourses }: CoursesProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const requestedCourses = isFeatured
    ? courses.filter((course) => course.isFeatured)
    : isFreeCourses
    ? courses.filter((course) => course.isFreeCourse)
    : "";
  // const featuredCourses = courses.filter((course) => course.isFeatured);
  const categories = useAppSelector((state) => state.categories.items);
  console.log("All the categories:", categories);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  console.log("Active category:", activeCategory);

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
    ? requestedCourses.filter((course) => course.category === activeCategory)
    : requestedCourses;

  return (
    <section className="container mx-auto px-4 md:px-12 xl:px-4 py-16">
      {/* Header */}
      <Header
        icon={MonitorPlay}
        normalText={isFeatured ? "Featured" : "Free"}
        colorText="Courses"
        description={
          isFeatured
            ? "Explore our top-rated courses and enhance your skills."
            : "Discover our free courses and start learning today."
        }
      />

      {/* Categories */}
      <div className="mb-10 flex items-center gap-3">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          className="flex h-6 w-6 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border"
        >
          <ChevronLeft className="h-6 w-6 lg:h-4 lg:w-4" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide"
        >
          {/* All */}
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
              activeCategory === null
                ? "bg-secondary text-white"
                : "text-gray-700 "
            }`}
          >
            All Courses
          </button>

          {categories.map((cat: { id: string; name: string; label: string }) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === cat.name
                  ? "bg-secondary text-white"
                  : "text-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className="flex h-6 w-6 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border"
        >
          <ChevronRight className="h-6 w-6 lg:h-4 lg:w-4" />
        </button>
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
