import { navBarMenus } from "@/data/landingPage/navBarData";
import { Link } from "react-router-dom";

interface itemType {
  label: string;
  link?: string;
}

const QuickLinks = () => {
  return (
    <div>
      <h4 className="mb-4 font-semibold text-gray-900">Quick Links</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {navBarMenus
          .filter((item) => item !== undefined)
          .map((item: itemType, i) => (
            <li key={i}>
              <Link
                to={item.link || "#"}
                className="hover:text-secondary transition"
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
