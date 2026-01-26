import { useRef, useState } from "react";
import { courses, featuredCourses } from "@/data/landingPage/courses";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseHeader from "./CourseHeader";
import Course from "./Course";

const Courses = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
    ? featuredCourses.filter(
        (course) => course.category === activeCategory
      )
    : featuredCourses;

  return (
    <section className="container mx-auto px-4 md:px-12 xl:px-4 py-16">
      {/* Header */}
      <CourseHeader />

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

          {courses.map((item) => (
            <button
              key={item.category}
              onClick={() => setActiveCategory(item.category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === item.category
                  ? "bg-secondary text-white"
                  : "text-gray-700"
              }`}
            >
              {item.label}
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
          <Course key={index} singleCourse={singleCourse} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
