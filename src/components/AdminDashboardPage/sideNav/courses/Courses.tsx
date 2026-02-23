import CoursesList from "./CoursesList";
import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
import PageHeader from "../shared/PageHeader";
import CreateButton from "../shared/CreateButton";

interface CoursesProps {
  courses: AddCourseFormValue[];
  setCourses: React.Dispatch<React.SetStateAction<AddCourseFormValue[]>>;
  handleEditCourse: (courseId: number | null) => void;
}

const Courses = ({ courses, setCourses, handleEditCourse }: CoursesProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Courses</PageHeader>
        <CreateButton route="/admin-dashboard/courses/addCourse" />
      </div>

      <CoursesList
        courses={courses}
        setCourses={setCourses}
        handleEditCourse={handleEditCourse}
      />
    </div>
  );
};

export default Courses;
