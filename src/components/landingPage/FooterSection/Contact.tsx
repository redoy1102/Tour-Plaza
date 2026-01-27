import { contactData, socialIconsData } from "@/data/landingPage/footerData";

const Contact = () => {
  return (
    <div id="contact">
      <h4 className="mb-4 font-semibold text-gray-900">যোগাযোগ</h4>
      <ul className="space-y-3 text-sm text-gray-600">
        {contactData.map((item, i) => {
          const Icon = item.icon;
          return (
            <li key={i} className="flex gap-3">
              <Icon className="mt-0.5 h-4 w-4 text-secondary" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>

      {/* Social Icons */}
      <div className="mt-5 flex gap-4">
        {socialIconsData.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              className="text-gray-500 hover:text-black transition"
              rel="noopener noreferrer"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
