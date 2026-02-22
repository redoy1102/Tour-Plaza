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
import type { PrerequisitesFormValue } from "@/schemas/admin/adminSchema";
import EditButton from "../../shared/EditButton";
import DeleteButton from "../../shared/DeleteButton";
import React from "react";
import { getIcon } from "@/data/icons";

interface PrerequisiteListProps {
  prerequisites: PrerequisitesFormValue[];
  setPrerequisites: React.Dispatch<
    React.SetStateAction<PrerequisitesFormValue[]>
  >;
  handleEditPrerequisite: (prerequisiteId: number | null) => void;
}

const PrerequisiteList = ({
  prerequisites,
  setPrerequisites,
  handleEditPrerequisite,
}: PrerequisiteListProps) => {
  const handleDelete = (index: number) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this prerequisite?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPrerequisites((prev) => prev.filter((_, i) => i !== index));
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
                <TableRow key={index}>
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
                    <EditButton onEdit={handleEditPrerequisite} index={index} />
                    <DeleteButton onDelete={handleDelete} index={index} />
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
