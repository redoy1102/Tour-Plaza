import { navBarMenus } from "@/data/landingPage/navBarData";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div>
      <h4 className="mb-4 font-semibold text-gray-900">কোর্সসমূহ</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {navBarMenus[0].subMenus &&
          navBarMenus[0].subMenus.map((course, i) => (
            <li key={i}>
              <Link
                to={course.link}
                className="hover:text-secondary transition"
                onClick={() => window.scrollTo(0, 0)}
              >
                {course.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Courses;
