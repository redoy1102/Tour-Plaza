import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";

interface CoursesListProps {
  courses: AddCourseFormValue[];
  setCourses: React.Dispatch<React.SetStateAction<AddCourseFormValue[]>>;
  handleEditCourse: (courseId: number | null) => void;
}

const CoursesList = ({courses, setCourses, handleEditCourse}: CoursesListProps) => {
    return (
        <div>
            <h1>Courses List</h1>
        </div>
    );
};

export default CoursesList;