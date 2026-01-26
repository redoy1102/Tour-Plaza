import { whyChooseUsData } from "@/data/landingPage/whyChooseData";

const WhyChooseSection = () => {
  return (
    <section className="container mx-auto px-4 pt-25 pb-10">
      {/* Section Title */}
      <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
        আমাদের <span className="text-primary">কোর্স</span> কেন বেছে নিবেন
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {whyChooseUsData.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="
                rounded-2xl
                bg-white
                px-8
                py-6
                text-center
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                
                hover:shadow-[0_25px_45px_rgba(0,0,0,0.10)]
              "
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <Icon className="h-9 w-9 text-secondary" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseSection;
