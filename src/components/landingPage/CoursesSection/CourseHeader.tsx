import { MonitorPlay } from "lucide-react";

const CourseHeader = () => {
    return (
        <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <MonitorPlay className="h-10 w-10 text-secondary" />
          <h2 className="text-xl md:text-3xl font-bold">
            রেকর্ডেড লাইভ <span className="text-primary">ক্লাস</span>
          </h2>
        </div>
        <p className="mx-auto max-w-2xl text-xs md:text-sm text-gray-600">
          যে কোনো সময়, যে কোনো জায়গা থেকে আমাদের রেকর্ডেড লাইভ ক্লাস দেখুন
          এবং পুনরায় শিখুন আপনার সুবিধামতো।
        </p>
      </div>
    );
};

export default CourseHeader;