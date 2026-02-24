import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { instructorsTableHeader } from "@/data/admin/AdminDashboardMenuData";
import ImagePreviewHolder from "../../shared/ImagePreviewHolder";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { removeInstructor } from "@/Redux/slices/instructorSlice";

interface InstructorsListProps {
  handleEditInstructor: (instructorId: string | null) => void;
}

const InstructorsList = ({ handleEditInstructor }: InstructorsListProps) => {
  const instructors = useAppSelector((state) => state.instructors.items);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this instructor?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeInstructor(id));
              toast.success("Instructor deleted successfully!");
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
  return (
    <div className=" border-gray-200">
      {instructors.length === 0 ? (
        <p className="text-gray-600">No instructors added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {instructorsTableHeader.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.align === "right" ? "text-right" : ""}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.map((instructor, index: number) => (
                <TableRow key={instructor.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <ImagePreviewHolder
                      imageSrc={instructor.imageFile}
                      altText={instructor.name}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {instructor.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {instructor.role}
                  </TableCell>
                  <TableCell className="font-medium">
                    {instructor.runningCompanyName}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditInstructor(instructor.id)}
                      className="cursor-pointer"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(instructor.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default InstructorsList;
