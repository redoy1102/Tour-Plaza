interface CourseProps {
  singleCourse: {
    imglink: string;
    title: string;
    duration: number;
    totalVideos: number;
    price: number;
    link: string;
  };
  index: number;
}

const Course = ({ singleCourse, index }: CourseProps) => {
  return (
    <a
      key={index}
      className="cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <img
        src={singleCourse.imglink}
        alt={singleCourse.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="mb-2 text-base font-semibold text-gray-900">
          {singleCourse.title} কোর্স
        </h3>

        <p className="mb-2 text-xs text-gray-500">
          {singleCourse.duration} মাস | {singleCourse.totalVideos} ভিডিও
        </p>

        <p className="mb-4 font-semibold text-secondary">৳ {singleCourse.price}</p>

        <a
          href={singleCourse.link}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          বিস্তারিত দেখুন <span>→</span>
        </a>
      </div>
    </a>
  );
};

export default Course;
