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
import { courseCategoryTableHeader } from "@/data/admin/AdminDashboardMenuData";
import type { CategoryFormValue } from "@/schemas/admin/adminSchema";

interface CourseCategoryListProps {
  categories: CategoryFormValue[];
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryFormValue[]>
  >;
  handleEditCategory: (categoryId: number | null) => void;
}

const CourseCategoryList = ({
  categories,
  setCategories,
  handleEditCategory,
}: CourseCategoryListProps) => {
  const handleDelete = (index: number) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this course category?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCategories((prev) => prev.filter((_, i) => i !== index));
              toast.success("Course category deleted successfully!");
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
      {categories.length === 0 ? (
        <p className="text-gray-600">No course categories added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {courseCategoryTableHeader.map((header) => (
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
              {categories.map((category, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {category.name}
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditCategory(index)}
                      className="cursor-pointer"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
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

export default CourseCategoryList;
