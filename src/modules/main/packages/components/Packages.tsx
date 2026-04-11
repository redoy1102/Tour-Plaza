import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import { Button } from "@/components/ui/button";
import { specialOffersData } from "@/data/offersData";
import { Badge, Sparkles } from "lucide-react";

const Packages = () => {
  return (
    <div>
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {specialOffersData.map((offer) => (
              <div
                key={offer.id}
                className={`flex flex-col lg:flex-row bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 ${offer.featured ? "ring-2 ring-primary/10" : ""}`}
              >
                {/* Image Section */}
                <div className="lg:w-2/5 relative h-72 lg:h-auto overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {offer.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white/90 backdrop-blur text-[#0F172A] hover:bg-white shadow-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 bg-accent text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    {offer.saving}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-5 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-tighter mb-1">
                          {offer.subtitle}
                        </p>
                        <h3 className="text-lg md:text-3xl font-serif text-[#0F172A]">
                          {offer.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 line-through font-medium">
                          Standard Rate
                        </p>
                        <p className="text-xl font-bold text-[#0F172A]">
                          {offer.price}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-8 leading-relaxed max-w-xl">
                      {offer.description}
                    </p>

                    {/* Inclusion Icons */}
                    <div className="flex flex-wrap gap-6 mb-8">
                      {offer.includes.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-slate-500 font-medium"
                        >
                          <div className="p-1.5 bg-[#F1F5F9] rounded-md text-accent">
                            <Sparkles size={14} />
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8">
                    <PrimaryButton
                      title="Book This Offer"
                      height="14"
                      px="10"
                    />
                    <Button
                      variant="outline"
                      className="h-14 px-10 rounded-xl text-lg border-slate-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
