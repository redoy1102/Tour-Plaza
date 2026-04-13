import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useEffect } from "react";

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
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default StudentAuthGuard;
