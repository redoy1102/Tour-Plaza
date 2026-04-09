import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutCTA = () => {
  return (
    <section className="py-40 text-center bg-[#0F172A] text-white rounded-t-[5rem] md:rounded-t-[10rem]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-7xl font-serif mb-12">
          Write your <br /> next chapter.
        </h2>
        <Button className="bg-white text-[#0F172A] hover:bg-primary hover:text-white px-12 py-8 rounded-full text-xl font-bold transition-all transform hover:-translate-y-2">
          Explore Suites <ArrowRight className="ml-3" />
        </Button>
      </div>
    </section>
  );
};

export default AboutCTA;
