import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const MemberShipCTA = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="bg-accent/10 rounded-[3rem] p-3 lg:p-20 flex flex-col lg:flex-row items-center gap-12 border border-accent/20">
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
            <div className=" w-full max-w-md">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 rounded-xl border border-slate-200 px-6 focus:ring-2 focus:ring-accent outline-none"
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

export default MemberShipCTA;
