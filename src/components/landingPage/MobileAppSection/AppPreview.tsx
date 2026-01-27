const AppPreview = () => {
  return (
    <div className="flex justify-center">
      <div
        className="
          relative
          h-130
          w-65
          rounded-[2.5rem]
          border-[6px]
          border-black
          bg-linear-to-br
          from-[#0b1220]
          via-[#1b1020]
          to-[#5a0f18]
          shadow-2xl
        "
      >
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-medium text-sm">App Preview</span>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
