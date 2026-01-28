import { Eye } from "lucide-react";

const VisionAbout = () => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Eye className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 inline-block">
              Our Vision
            </span>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              আমাদের দৃষ্টি
            </h2>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed text-lg italic">
          "আমাদের দৃষ্টি হলো একটি ডিজিটাল বাংলাদেশ গড়ে তোলা যেখানে প্রতিটি তরুণ
          তার দক্ষতা এবং জ্ঞানের মাধ্যমে বিশ্বের সাথে প্রতিযোগিতা করতে পারে।
          আমরা চাই যে শিক্ষার্থীরা দেশের উন্নয়নে অবদান রাখুক।"
        </p>
      </div>
    </div>
  );
};

export default VisionAbout;
