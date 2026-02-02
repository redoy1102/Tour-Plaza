import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  courseId: string | undefined;
}

const Faq = ({ courseId }: FaqProps) => {
  // courseId can be used to fetch course-specific FAQs in the future
  console.log("Loading FAQs for course:", courseId);

  const faqs = [
    {
      question: "আমি কি ভিডিওগুলো ডাউনলোড করতে পারবো?",
      answer:
        "না, ভিডিওগুলো ডাউনলোড করা যাবে না। তবে আপনি আমাদের প্ল্যাটফর্মে লগইন করে যেকোনো সময় ভিডিওগুলো দেখতে পারবেন।",
    },
    {
      question: "আমি কি মোবাইল দিয়ে জয়েন করতে পারবো?",
      answer:
        "হ্যাঁ, আপনি মোবাইল, ট্যাবলেট বা ল্যাপটপ যেকোনো ডিভাইস থেকেই আমাদের লাইভ ক্লাস এবং রেকর্ডেড ভিডিওগুলো দেখতে পারবেন।",
    },
    {
      question: "আমার কি ভিডিওগুলোর লাইফটাইম এক্সেস থাকবে?",
      answer:
        "হ্যাঁ, একবার এনরোল করলে আপনি এই কোর্সের সকল ভিডিও এবং রিসোর্সের লাইফটাইম এক্সেস পাবেন।",
    },
    {
      question: "লাইভ ক্লাস কোথায় হবে?",
      answer:
        "আমাদের সকল লাইভ ক্লাস গুগল মিট (Google Meet) অথবা জুম (Zoom) প্ল্যাটফর্মে অনুষ্ঠিত হবে। ক্লাসের লিংক আপনার ড্যাশবোর্ডে এবং ইমেইলে দেওয়া হবে।",
    },
    {
      question: "এসেসমেন্ট কিভাবে হবে?",
      answer:
        "প্রতিটি মডিউল শেষে কুইজ এবং অ্যাসাইনমেন্ট থাকবে। এছাড়াও কোর্সের শেষে একটি ফাইনাল প্রজেক্ট থাকবে যা আপনার দক্ষতা যাচাইয়ে সাহায্য করবে।",
    },
  ];

  const bengaliNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return (
    <section className="pb-16">
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
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-8 pr-3 pb-3 text-slate-600 leading-relaxed text-[16px] md:text-lg border-t border-slate-50">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
