import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Radio, ScrollText, FileQuestion } from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";

interface CourseOutlineProps {
  courseId: string | undefined;
}

const CourseOutline = ({ courseId }: CourseOutlineProps) => {
  const courses = useAppSelector((state) => state.courses.items);
  const course = courses.find((c) => c.id === courseId);

  if (!course || !course.courseOutline) {
    return null;
  }

  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBengaliNumber = (n: string | number) => {
    return n
      .toString()
      .split("")
      .map((digit) => bengaliNumbers[parseInt(digit)] || digit)
      .join("");
  };

  const colors = [
    "bg-emerald-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-pink-500",
  ];

  return (
    <div className="container mx-auto px-4 md:px-12 xl:px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
        কোর্স কারিকুলাম
      </h2>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {course.courseOutline.map((module, index) => {
              const bgClass = colors[index % colors.length];

              return (
                <AccordionItem
                  key={index}
                  value={`module-${index}`}
                  className="border-none mb-4"
                >
                  <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                    <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:mr-4 cursor-pointer">
                      <div className="flex items-center gap-4 text-left">
                        {/* Serial number  */}
                        <div
                          className={`${bgClass} text-white px-3 py-2 rounded-lg flex flex-col items-center justify-center min-w-17.5`}
                        >
                          <span className="text-[10px] uppercase font-bold leading-none">
                            মডিউল
                          </span>
                          <span className="text-lg md:text-xl font-bold">
                            {toBengaliNumber(index + 1)}
                          </span>
                        </div>
                        {/* Title  */}
                        <div>
                          <h3 className="text-md md:text-lg font-bold text-slate-800">
                            {module.moduleTitle}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-3 py-3 border-t border-gray-200 bg-slate-50/50">
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium pb-4">
                          {module.classes && module.classes.length > 0 && (
                            <div className="flex items-center gap-1.5 bg-white border px-3 py-1 rounded-full">
                              <Radio className="w-4 h-4 text-slate-400" />
                              <span>
                                {toBengaliNumber(module.classes.length)} টি
                                ক্লাস
                              </span>
                            </div>
                          )}
                          {module.quizzes && module.quizzes.length > 0 && (
                            <div className="flex items-center gap-1.5 bg-white border px-3 py-1 rounded-full">
                              <FileQuestion className="w-4 h-4 text-slate-400" />
                              <span>
                                {toBengaliNumber(module.quizzes.length)} টি কুইজ
                              </span>
                            </div>
                          )}
                          {module.assignment &&
                            module.assignment.length > 0 && (
                              <div className="flex items-center gap-1.5 bg-white border px-3 py-1 rounded-full">
                                <ScrollText className="w-4 h-4 text-slate-400" />
                                <span>
                                  {toBengaliNumber(module.assignment.length)} টি
                                  অ্যাসাইনমেন্ট
                                </span>
                              </div>
                            )}
                        </div>

                        <div className="space-y-6">
                          {module.classes?.map((cls, clsIdx) => (
                            <div key={clsIdx} className="space-y-3">
                              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                ক্লাস {toBengaliNumber(clsIdx + 1)}: {cls.title}
                              </h4>
                              {/* Video link is omitted intentionally */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              );
            })}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default CourseOutline;
