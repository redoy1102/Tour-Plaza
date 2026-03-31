import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Sparkles } from "lucide-react";
import { specialOffersData } from "@/data/offersData";
import PageHeader from "@/components/shared/PageHeader";
import PrimaryButton from "@/components/shared/PrimaryButton";

const SpecialOffersSection = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        imgLink="https://plus.unsplash.com/premium_photo-1672759267853-533e2d24813c?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Exclusive Packages"
        description="Elevate your stay with our curated selections of seasonal offers and
            member-only benefits."
      />

      {/* 2. Main Offers Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
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
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-tighter mb-1">
                          {offer.subtitle}
                        </p>
                        <h3 className="text-3xl font-serif text-[#0F172A]">
                          {offer.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 line-through font-medium">
                          Standard Rate
                        </p>
                        <p className="text-2xl font-bold text-[#0F172A]">
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

      {/* 3. Newsletter / Membership CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-accent/10 rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 border border-accent/20">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex p-4 bg-accent rounded-2xl text-white mb-6 shadow-lg">
                <Tag size={32} />
              </div>
              <h2 className="text-4xl font-serif text-[#0F172A] mb-4">
                Never Miss an Exclusive Deal
              </h2>
              <p className="text-slate-600 text-lg">
                Join the Tour Plaza Circle and get notified about flash sales
                and secret rates 48 hours before the public.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-14 rounded-xl border border-slate-200 px-6 focus:ring-2 focus:ring-accent outline-none"
                />
                <Button className="bg-[#0F172A] h-14 px-8 rounded-xl">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-xs text-slate-400 text-center lg:text-left italic">
                * We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialOffersSection;
