import type { AnnouncementFormValue } from "@/schemas/admin/announcementsSchema";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TextModal from "../shared/TextModal";
import { SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { announcementTableHeader } from "@/data/admin/AdminDashboardMenuData";

interface AnnouncementsListProps {
  announcements: AnnouncementFormValue[];
  setAnnouncements: React.Dispatch<
    React.SetStateAction<AnnouncementFormValue[]>
  >;
  handleEditAnnouncement: (announcement: AnnouncementFormValue | null) => void;
}

const AnnouncementsList = ({
  announcements,
  setAnnouncements,
  handleEditAnnouncement,
}: AnnouncementsListProps) => {
  const handleDelete = (index: number) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this announcement?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAnnouncements((prev) => prev.filter((_, i) => i !== index));
              toast.success("Announcement deleted successfully!");
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
      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements posted yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {announcementTableHeader.map((header) => (
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
              {announcements.map((announcement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {announcement.title}
                  </TableCell>
                  {announcement.description.length > 50 ? (
                    <TableCell className="">
                      <TextModal
                        btnLabel="View Description"
                        title={announcement.title}
                        description={announcement.description}
                      />
                    </TableCell>
                  ) : (
                    <TableCell className="">
                      {announcement.description}
                    </TableCell>
                  )}

                  <TableCell>{announcement.type}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
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

export default AnnouncementsList;
