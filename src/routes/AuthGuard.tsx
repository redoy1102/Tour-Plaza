import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useEffect } from "react";

// Simple guard that checks whether a student is logged in; if not, redirect to
// the landing/home page.  Wrap this around any route subtree that should be
// protected from unauthenticated access.
const StudentAuthGuard = () => {
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );

  useEffect(() => {
    if (!currentStudent) {
      toast.error("এই পৃষ্ঠাটি দেখতে লগইন করুন!", {
        id: "auth-guard-warning",
      });
    }
  }, [currentStudent]);

  if (!currentStudent) {
    // user not logged in; kick them to the home page
    return <Navigate to="/" replace />;
  }

  // allow route rendering to continue
  return <Outlet />;
};

export default StudentAuthGuard;
