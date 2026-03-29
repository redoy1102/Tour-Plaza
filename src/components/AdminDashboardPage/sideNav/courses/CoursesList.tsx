import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { removeCourse } from "@/Redux/slices/courseSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const courses = useAppSelector((state) => state.courses.items);
  const categories = useAppSelector((state) => state.categories.items);

  const handleDelete = (courseId: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this course?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeCourse(courseId));
              toast.success("Course deleted successfully!", {
                id: "delete-course-success",
              });
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleView = (courseId: string) => {
    navigate(`/admin-dashboard/courses/view/${courseId}`);
  };

  const handleEdit = (courseId: string) => {
    navigate(`/admin-dashboard/courses/edit/${courseId}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses added yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, idx) => {
              const categoryName =
                categories.find((c) => c.id === course.categoryId)?.name || "-";
              return (
                <TableRow key={course.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{categoryName}</TableCell>
                  <TableCell>{course.batchNumber}</TableCell>
                  <TableCell>৳{course.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(course.id)}
                        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleEdit(course.id)}
                        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
                        title="Edit Course"
                      >
                        <SquarePen className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CoursesList;
