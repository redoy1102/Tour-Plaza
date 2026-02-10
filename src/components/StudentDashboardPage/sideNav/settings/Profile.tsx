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
      <h1 className="text-2xl font-bold mb-6 text-black">আমার প্রোফাইল</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Avatar */}
        <div className="md:col-span-1 flex flex-col items-center p-8 bg-white rounded-2xl border border-gray-300 shadow-xl">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
            <User className="w-16 h-16 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-black">তানভীর আহমেদ</h2>
          <p className="text-gray-500 text-sm">স্টুডেন্ট আইডি: #১২৩৪৫</p>
          <Button className="mt-6 w-full bg-primary hover:bg-red-500 text-white cursor-pointer">
            ছবি পরিবর্তন করুন
          </Button>
        </div>

        <div className="md:col-span-2 p-8 bg-white rounded-2xl border border-gray-300 shadow-xl space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">আপনার নাম</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-black/50 transition-colors"
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
                      <FormLabel className="text-black">আপনার ইমেইল</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-black/50 transition-colors"
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
                      <FormLabel className="text-black">ফোন নাম্বার</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-black/50 transition-colors"
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
                      <FormLabel className="text-black">ঠিকানা</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-black/50 transition-colors"
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

          <Button className="bg-primary hover:bg-red-500 text-white cursor-pointer px-8 mt-4">
            প্রোফাইল আপডেট করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
