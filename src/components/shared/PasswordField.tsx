import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { PasswordUpdateFormValues } from "@/schemas/auth";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  form: UseFormReturn<PasswordUpdateFormValues>;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  name: keyof PasswordUpdateFormValues;
  label: string;
}

const PasswordField = ({
  form,
  showPassword,
  setShowPassword,
  name,
  label,
}: PasswordFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...field}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900 outline-none focus:border-black/50 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
