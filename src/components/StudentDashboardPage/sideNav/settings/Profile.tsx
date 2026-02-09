import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Profile = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: ProfileFormValues) {
    console.log("Submitted Data:", values);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">আমার প্রোফাইল</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Avatar */}
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">আপনার নাম</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="তানভীর আহমেদ"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">আপনার ইমেইল</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="tanvir@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">ফোন নাম্বার</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="০১৭xxxxxxxx"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">ঠিকানা</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="ঢাকা, বাংলাদেশ"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              
            </form>
          </Form>
          
          <Button className="bg-sky-600 hover:bg-sky-500 text-white px-8 mt-4">
            প্রোফাইল আপডেট করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
