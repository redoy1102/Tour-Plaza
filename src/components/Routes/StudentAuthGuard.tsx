import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";

// Simple guard that checks whether a student is logged in; if not, redirect to
// the landing/home page.  Wrap this around any route subtree that should be
// protected from unauthenticated access.
const StudentAuthGuard = () => {
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );

  if (!currentStudent) {
    // user not logged in; kick them to the home page
    return <Navigate to="/" replace />;
  }

  // allow route rendering to continue
  return <Outlet />;
};

export default StudentAuthGuard;
