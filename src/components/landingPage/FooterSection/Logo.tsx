import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" onClick={() => window.scrollTo(0, 0)}>
        <img
          src="/public/logo.webp"
          alt="eManager IT Institute Logo"
          className="w-32 mb-4"
        />
      </Link>
      <p className="max-w-sm text-sm leading-relaxed text-gray-600">
        আমরা তৈরি করি দক্ষ ও আত্মবিশ্বাসী প্রফেশনাল। আধুনিক স্কিল, বাস্তব
        অভিজ্ঞতা এবং ক্যারিয়ার সাপোর্ট—সব এক জায়গায়।
      </p>
    </div>
  );
};

export default Logo;
