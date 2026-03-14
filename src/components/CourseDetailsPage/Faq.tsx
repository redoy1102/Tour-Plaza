import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppSelector } from "@/Redux/hooks";

const Faq = () => {
  const faqs = useAppSelector((state) => state.faqs.items);

  const bengaliNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return (
    <section className="pb-16 mt-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-slate-800 font-bengali inline-block relative px-4">
            প্রায়ই জিজ্ঞেস করা <span className="text-orange-400">প্রশ্ন</span>
            <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-orange-400 rounded-full" />
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded bg-white px-1 shadow-sm data-[state=open]:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-left py-4 px-2 hover:no-underline font-bold text-slate-700 md:text-lg group">
                <div className="flex items-start gap-3">
                  <span className=" group-data-[state=open]:text-primary transition-colors">
                    {bengaliNumbers[index]}.
                  </span>
                  <span>{faq.faqTitle}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-8 pr-3 pb-3 text-slate-600 leading-relaxed text-[16px] md:text-lg border-t border-slate-50">
                {faq.faqDescription}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
