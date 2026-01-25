import AppDownloadButtons from "./AppDownloadButtons";

const AppInfo = () => {
  return (
    <div>
      <h2 className="mb-7 text-3xl font-bold text-gray-900">
        আমাদের <span className="text-secondary"> মোবাইল অ্যাপ </span>ডাউনলোড
        করুন
      </h2>

      <p className="text-gray-600 text-sm max-w-2xl leading-relaxed mb-9">
        যেকোনো সময়, যেকোনো জায়গা থেকে কোর্স দেখুন, লাইভ ক্লাসে অংশ নিন এবং
        নিজের শেখার অগ্রগতি ট্র্যাক করুন। আমাদের মোবাইল অ্যাপ আপনাকে দেবে
        সম্পূর্ণ স্মার্ট লার্নিং অভিজ্ঞতা।
      </p>

      <AppDownloadButtons />
    </div>
  );
};

export default AppInfo;
