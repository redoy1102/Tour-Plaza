import { quickLinksData } from "@/data/landingPage/footerData";

const QuickLinks = () => {
  return (
    <div>
      <h4 className="mb-4 font-semibold text-gray-900">কুইক লিংক</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        {quickLinksData.map((item, i) => (
          <li key={i}>
            <a href={item.url} className="hover:text-secondary transition">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
