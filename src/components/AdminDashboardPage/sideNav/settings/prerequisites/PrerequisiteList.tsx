import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { prerequisitesTableHeader } from "@/data/admin/AdminDashboardMenuData";
import React from "react";
import { getIcon } from "@/data/icons";
import { SquarePen, Trash } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { removePrerequisite } from "@/Redux/slices/prerequisitesSlice";

interface PrerequisiteListProps {
  handleEditPrerequisite: (prerequisiteId: string | null) => void;
}

const PrerequisiteList = ({
  handleEditPrerequisite,
}: PrerequisiteListProps) => {
  const prerequisites = useAppSelector((state) => state.prerequisites.items);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this prerequisite?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removePrerequisite(id));
              toast.success("Prerequisite deleted successfully!");
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
      {prerequisites.length === 0 ? (
        <p className="text-gray-600">No prerequisites added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {prerequisitesTableHeader.map((header) => (
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
              {prerequisites.map((prerequisite, index: number) => (
                <TableRow key={prerequisite.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {React.createElement(getIcon(prerequisite.icon), {
                      className: "w-5 h-5",
                    })}
                    <span>{prerequisite.icon}</span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {prerequisite.title}
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditPrerequisite(prerequisite.id)}
                      className="cursor-pointer"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(prerequisite.id)}
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

export default PrerequisiteList;
