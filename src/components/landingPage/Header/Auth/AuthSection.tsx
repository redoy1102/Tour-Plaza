import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Header from "./Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authSchema, type AuthFormValues } from "@/schemas/auth";

export function AuthSheet({ className }: { className?: string }) {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: AuthFormValues) {
    console.log("Submitted Data:", values);
    // Handle form submission here (API call, etc.)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "rounded-full px-6 flex items-center gap-2 group bg-primary text-white cursor-pointer",
            className
          )}
        >
          <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          লগইন / সাইন আপ
        </Button>
      </SheetTrigger>

      <SheetContent className="w-100 sm:w-135">
        <Header isLogin={isLogin} />

        <div className="py-8">
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>নাম</FormLabel>
                      <FormControl>
                        <Input placeholder="আপনার নাম" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ইমেইল</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পাসওয়ার্ড</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                className="w-full bg-primary text-white mt-4 cursor-pointer hover:bg-primary/90"
              >
                {isLogin ? "লগইন" : "রেজিস্ট্রেশন করুন"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "অ্যাকাউন্ট নেই?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.reset();
                }}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? "সাইন আপ করুন" : "লগইন করুন"}
              </button>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
