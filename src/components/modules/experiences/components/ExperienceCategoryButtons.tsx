import { Button } from "@/components/ui/button";

interface ExperienceCategoryButtonsProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const ExperienceCategoryButtons = ({
  activeCategory,
  setActiveCategory,
}: ExperienceCategoryButtonsProps) => {
  const categories = ["All", "Adventure", "Wellness", "Dining", "Water"];
  
  return (
    <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-6">
      <div className="container mx-auto px-6 flex justify-center gap-4 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className={`rounded-full px-8 ${activeCategory === cat ? "bg-primary hover:bg-primary" : "text-slate-600"} cursor-pointer`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default ExperienceCategoryButtons;
