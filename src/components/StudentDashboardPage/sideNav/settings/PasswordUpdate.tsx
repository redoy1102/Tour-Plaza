import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordUpdateSchema,
  type PasswordUpdateFormValues,
} from "@/schemas/auth";
import { Form } from "@/components/ui/form";
import PasswordField from "@/components/shared/PasswordField";

const PasswordUpdate = () => {
  const form = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function onSubmit(value: PasswordUpdateFormValues) {
    console.log("Submitted Data:", value);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 tracking-tight text-black">
        পাসওয়ার্ড পরিবর্তন করুন
      </h1>

      <div className="p-8 bg-white rounded-2xl border border-gray-300 shadow-xl space-y-6">
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <PasswordField
                form={form}
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
                name="currentPassword"
                label="বর্তমান পাসওয়ার্ড"
              />

              <PasswordField
                form={form}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
                name="newPassword"
                label="নতুন পাসওয়ার্ড"
              />

              <PasswordField
                form={form}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                name="confirmPassword"
                label="পাসওয়ার্ড নিশ্চিতকরণ"
              />
            </form>
          </Form>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button className="bg-primary hover:bg-red-500 text-white px-8 h-12 rounded-xl">
            পাসওয়ার্ড আপডেট করুন
          </Button>
          <p className="text-xs text-gray-500 flex items-center gap-2 italic">
            <Lock className="w-3 h-3" /> সিকিউরড কানেকশন
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
