import { User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white mb-6">আমার প্রোফাইল</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center p-8 bg-[#0a0f1c] rounded-2xl border border-slate-800/50 shadow-xl">
          <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-4 overflow-hidden">
            <User className="w-16 h-16 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-white">তানভীর আহমেদ</h2>
          <p className="text-slate-500 text-sm">স্টুডেন্ট আইডি: #১২৩৪৫</p>
          <Button className="mt-6 w-full bg-sky-600 hover:bg-sky-500 text-white">
            ছবি পরিবর্তন করুন
          </Button>
        </div>

        <div className="md:col-span-2 p-8 bg-[#0a0f1c] rounded-2xl border border-slate-800/50 shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-500">আপনার নাম</label>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-slate-200">
                <User className="w-4 h-4 text-slate-500" />
                <span>তানভীর আহমেদ</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-500">ইমেইল এড্রেস</label>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-slate-200">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>tanvir@example.com</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-500">ফোন নাম্বার</label>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-slate-200">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>০১৭xxxxxxxx</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-500">ঠিকানা</label>
              <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-slate-200">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>
          <Button className="bg-sky-600 hover:bg-sky-500 text-white px-8">
            প্রোফাইল আপডেট করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
