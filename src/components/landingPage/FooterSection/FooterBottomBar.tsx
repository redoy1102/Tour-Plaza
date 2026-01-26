const FooterBottomBar = () => {
  return (
    <>
      <div className="py-16 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
        <p>© 2026 eManager IT Institute. সর্বস্বত্ব সংরক্ষিত</p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">
            প্রাইভেসি পলিসি
          </a>
          <a href="#" className="hover:text-primary">
            টার্মস & কন্ডিশন
          </a>
        </div>
      </div>
    </>
  );
};

export default FooterBottomBar;
