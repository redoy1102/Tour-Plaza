import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-4 md:right-6 z-50 flex flex-col items-center space-y-4">
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/YOUR_WHATSAPP_NUMBER" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={25} />
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 ease-in-out cursor-pointer ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        aria-label="Go to top"
      >
        <ArrowUp size={25} />
      </button>
    </div>
  );
};

export default FloatingButtons;
