import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="block">
        <img
          src="/tourPlazaLogo.webp"
          alt="Tour Plaza Logo"
          className="w-36 transition-opacity hover:opacity-90"
        />
      </Link>
      <p className="max-w-xs text-sm leading-relaxed text-[#64748B]">
        Redefining luxury through nature and tranquility. We provide a sanctuary
        where world-class hospitality meets modern elegance, ensuring every stay
        is an unforgettable journey.
      </p>
    </div>
  );
};

export default Logo;
