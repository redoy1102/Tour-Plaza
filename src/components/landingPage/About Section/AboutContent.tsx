import CourseSeeBtn from "@/lib/CourseSeeBtn";
import EnrollNowBtn from "@/lib/EnrollNowBtn";

interface AboutContentProps {
  beforeColorText?: string;
  colorText?: string;
  afterColorText?: string;
  description?: React.ReactNode;
  primaryBtn?: boolean;
  secondaryBtn?: boolean;
}

const AboutContent = ({
  beforeColorText,
  colorText,
  afterColorText,
  description,
  primaryBtn,
  secondaryBtn,
}: AboutContentProps) => {
  console.log({ primaryBtn, secondaryBtn });
  return (
    <div className="space-y-5">
      <h2 className="mb-7 text-4xl font-bold text-gray-900">
        {beforeColorText} <span className="text-secondary"> {colorText} </span>
        {afterColorText}
      </h2>

      <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
        {description}
      </p>

      {(primaryBtn || secondaryBtn) && (
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
          {secondaryBtn && (
            <CourseSeeBtn btnLabel="সব কোর্স দেখুন" btnLink="/courses" />
          )}
          {primaryBtn && (
            <EnrollNowBtn btnLabel="এখনই ভর্তি হন" btnLink="/enroll" />
          )}
        </div>
      )}
    </div>
  );
};

export default AboutContent;
