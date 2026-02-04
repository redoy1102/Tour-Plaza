import { quickLinksData } from "@/data/landingPage/footerData";
import { Link } from "react-router-dom";

interface itemType {
  label: string;
  link?: string;
}

const QuickLinks = () => {
  return (
    <div>
      <h4 className="mb-4 font-semibold text-gray-900">কুইক লিংক</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {quickLinksData
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
