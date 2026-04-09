import { Button } from "@/components/ui/button";
import { Quote, Linkedin, Instagram } from "lucide-react";

const AboutFounder = () => {
    return (
        <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full -z-10 animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                className="w-full aspect-4/5 object-cover rounded-3xl shadow-xl grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Founder"
              />
            </div>
            <div className="flex-1 space-y-8">
              <Quote className="text-primary opacity-20" size={64} />
              <p className="text-2xl md:text-4xl font-serif italic text-slate-800 leading-tight">
                "I wanted to build a place where the clock stops ticking. Tour
                Plaza is my love letter to silence and the sea."
              </p>
              <div>
                <h4 className="text-2xl font-bold">Kazi Atik</h4>
                <p className="text-primary font-bold tracking-widest text-xs uppercase mt-1">
                  Founder & Chief Architect
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 border-slate-200 hover:text-primary hover:border-primary"
                >
                  <Linkedin size={18} />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 border-slate-200 hover:text-primary hover:border-primary"
                >
                  <Instagram size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AboutFounder;