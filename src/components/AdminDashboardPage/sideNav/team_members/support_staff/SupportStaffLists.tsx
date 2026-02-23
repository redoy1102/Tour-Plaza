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
import { supportStaffTableHeader } from "@/data/admin/AdminDashboardMenuData";
import ImagePreviewHolder from "../../shared/ImagePreviewHolder";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { removeSupportStaff } from "@/Redux/slices/supportStaffSlice";

interface SupportStaffListsProps {
  handleEditSupportStaff: (supportStaffId: number | null) => void;
}

const SupportStaffLists = ({
  handleEditSupportStaff,
}: SupportStaffListsProps) => {
  const supportStaff = useAppSelector((state) => state.supportStaff.items);
  const dispatch = useAppDispatch();

  const handleDelete = (index: number) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this support staff member?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeSupportStaff(index));
              toast.success("Support staff member deleted successfully!");
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
      {supportStaff.length === 0 ? (
        <p className="text-gray-600">No support staff added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {supportStaffTableHeader.map((header) => (
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
              {supportStaff.map((staff, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <ImagePreviewHolder
                      imageSrc={staff.imageFile}
                      altText={staff.name}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell className="font-medium">{staff.role}</TableCell>
                  <TableCell className="font-medium">
                    {staff.runningCompanyName}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditSupportStaff(index)}
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

export default SupportStaffLists;
