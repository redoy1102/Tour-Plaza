import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordUpdateSchema,
  type PasswordUpdateFormValues,
} from "@/schemas/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const PasswordUpdate = () => {
  const form = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(value: PasswordUpdateFormValues) {
    console.log("Submitted Data:", value);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 tracking-tight">
        পাসওয়ার্ড পরিবর্তন করুন
      </h1>

      <div className="p-8 bg-[#0a0f1c] rounded-2xl border border-slate-800/50 shadow-xl space-y-6">
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      বর্তমান পাসওয়ার্ড
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        {...field}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">নতুন পাসওয়ার্ড</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        {...field}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      পাসওয়ার্ড নিশ্চিতকরণ
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        {...field}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                        placeholder="••••••••"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button className="bg-sky-600 hover:bg-sky-500 text-white px-8 h-12 rounded-xl">
            পাসওয়ার্ড আপডেট করুন
          </Button>
          <p className="text-xs text-slate-500 flex items-center gap-2 italic">
            <Lock className="w-3 h-3" /> সিকিউরড কানেকশন
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
