import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, Eye, EyeOff, LogOut } from "lucide-react";
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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { signUp, login, logout } from "@/Redux/slices/studentSlice";
import { generateMockToken } from "@/lib/jwt";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function AuthSheet({ className }: { className?: string }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const students = useAppSelector((state) => state.student.students);
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent
  );

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });

  function onSubmit(values: AuthFormValues) {
    if (isLogin) {
      // ── Login flow ──
      const student = students.find((s) => s.email === values.email);
      if (!student) {
        toast.error("এই ইমেইলে কোনো অ্যাকাউন্ট নেই!");
        return;
      }
      if (btoa(values.password) !== student.passwordHash) {
        toast.error("পাসওয়ার্ড ভুল!");
        return;
      }
      const token = generateMockToken({
        id: student.id,
        email: student.email,
        name: student.name,
        role: "student",
      });
      dispatch(
        login({
          studentId: student.id,
          name: student.name,
          email: student.email,
          token,
        })
      );
      toast.success("লগইন সফল হয়েছে!");
      setSheetOpen(false);
      form.reset();
    } else {
      // ── Sign-up flow ──
      const existing = students.find((s) => s.email === values.email);
      if (existing) {
        toast.error("এই ইমেইল ইতিমধ্যে রেজিস্টার করা আছে!");
        return;
      }
      const id = nanoid();
      const token = generateMockToken({
        id,
        email: values.email,
        name: values.name ?? "",
        role: "student",
      });
      dispatch(
        signUp({
          id,
          name: values.name ?? "",
          email: values.email,
          passwordHash: btoa(values.password),
          token,
        })
      );
      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
      setSheetOpen(false);
      form.reset();
      navigate("/");
    }
  }

  // ── Already logged in: show user pill + logout ──
  if (currentStudent) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          variant="outline"
          className="rounded-full px-4 flex items-center gap-2 bg-primary text-white cursor-pointer"
          onClick={() => navigate("/student")}
        >
          <User className="w-4 h-4" />
          {currentStudent.name}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={() => {
            dispatch(logout());
            toast.success("লগআউট সফল হয়েছে!");
          }}
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                    <FormLabel>পাসওয়ার্ড</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
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
