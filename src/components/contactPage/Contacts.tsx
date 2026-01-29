import { contactInfo } from "@/data/landingPage/contactData";

const Contacts = () => {
  return (
    <div className="space-y-4">
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <a
            key={index}
            href={info.href}
            className="grid grid-cols-12 items-center justify-between gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="col-span-9 flex items-center gap-4">
              <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <Icon className="h-4 w-4 md:h-6 md:w-6 text-[#1e3a5f]" />
              </div>

              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  {info.label}
                </p>
                <p className="text-sm md:text-lg font-bold text-gray-900">{info.value}</p>
              </div>
            </div>

            <span className="col-span-3 text-[#1e3a5f] font-bold text-sm md:text-lg px-4 group-hover:underline uppercase tracking-wide">
              {info.actionLabel}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default Contacts;
