import { courses } from "@/data/landingPage/courses";

const Courses = () => {
  return (
    <div>
      <h4 className="mb-4 font-semibold text-gray-900">কোর্সসমূহ</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {courses.map((course, i) => (
          <li key={i}>
            <a href={course.link} className="hover:text-secondary transition">
              {course.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
