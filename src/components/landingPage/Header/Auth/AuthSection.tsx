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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { signUp, login, logout } from "@/Redux/slices/studentSlice";
import { generateMockToken } from "@/lib/jwt";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/auth.schema/login.schema";
import {
  signupSchema,
  type SignupFormValues,
} from "@/schemas/auth.schema/signup.schema";

export function AuthSheet({ className }: { className?: string }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const students = useAppSelector((state) => state.student.students);
  const token = useAppSelector((state) => state.student.token);
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );

  if (currentStudent && token) {
    console.log("Already logged in:", currentStudent, token);
  }

  // Separate forms for login and signup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin@gmail.com",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(values: LoginFormValues) {
    console.log("Login form submitted with values:", values);
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
      phone: student.phone,
      role: "student",
    });
    dispatch(
      login({
        studentId: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        token,
      }),
    );
    toast.success("লগইন সফল হয়েছে!");
    setSheetOpen(false);
    loginForm.reset();
    navigate("/student");
  }

  function onSignupSubmit(values: SignupFormValues) {
    console.log("Signup form submitted with values:", values);
    const existing = students.find((s) => s.email === values.email);
    if (existing) {
      toast.error("এই ইমেইল ইতিমধ্যে রেজিস্টার করা আছে!");
      return;
    }
    const id = nanoid();
    const token = generateMockToken({
      id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: "student",
    });
    dispatch(
      signUp({
        id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        passwordHash: btoa(values.password),
        token,
      }),
    );
    toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
    setSheetOpen(false);
    signupForm.reset();
    navigate("/student");
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
            toast((t) => (
              <div className="flex flex-col items-start gap-4">
                <p>আপনি কি সত্যিই লগআউট করতে চান?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      dispatch(logout());
                      toast.success("লগআউট সফল হয়েছে!");
                      toast.dismiss(t.id);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    হ্যাঁ, লগআউট
                  </button>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ));
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
            className,
          )}
        >
          <User className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          লগইন / সাইন আপ
        </Button>
      </SheetTrigger>

      <SheetContent className="w-100 sm:w-135">
        <Header isLogin={isLogin} />

        <div className="py-8" key={isLogin ? "login" : "signup"}>
          {isLogin ? (
            // ── Login Form ──
            <Form {...loginForm} key="login-form">
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
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
                  control={loginForm.control}
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
                  disabled={!loginForm.formState.isDirty}
                >
                  লগইন
                </Button>
              </form>
            </Form>
          ) : (
            // ── Signup Form ──
            <Form {...signupForm} key="signup-form">
              <form
                onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={signupForm.control}
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

                <FormField
                  control={signupForm.control}
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
                  control={signupForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ফোন</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
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

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>পাসওয়ার্ড নিশ্চিতকরণ</FormLabel>
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
                  disabled={!signupForm.formState.isDirty}
                >
                  রেজিস্ট্রেশন করুন
                </Button>
              </form>
            </Form>
          )}

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "অ্যাকাউন্ট নেই?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
              <button
                onClick={() => {
                  setShowPassword(false); // Reset password visibility
                  loginForm.reset();
                  signupForm.reset();
                  setIsLogin(!isLogin);
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
