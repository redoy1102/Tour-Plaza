
import AddCourseForm from "./AddCourseForm";
import CoursesList from "./CoursesList";
import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
import PageHeader from "../shared/PageHeader";
import CreateButton from "../shared/CreateButton";

const Courses = () => {
  
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Courses</PageHeader>
        <CreateButton onRoute="admin-dashboard/courses/addCourse" />
        {/* <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditCourseId(null);
          }}
        >
          <DialogTrigger>
            <CreateButton />
          </DialogTrigger>
          <DialogContent>
            <AddCourseForm
              courses={courses}
              setCourses={setCourses}
              editCourseId={editCourseId}
              handleEditCourse={handleEditCourse}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog> */}
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
