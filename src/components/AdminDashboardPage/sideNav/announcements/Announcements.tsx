import PageHeader from "../shared/PageHeader";
import type { AnnouncementFormValue } from "@/schemas/admin/announcementsSchema";
import { useState } from "react";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementsList from "./AnnouncementsList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<AnnouncementFormValue[]>(
    []
  );
  const [editAnnouncement, setEditAnnouncement] =
    useState<AnnouncementFormValue | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditAnnouncement = (
    announcement: AnnouncementFormValue | null
  ) => {
    setEditAnnouncement(announcement);
    if (announcement) {
      setDialogOpen(true);
    }
  };

  console.log("All announcements:", announcements);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Announcements</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditAnnouncement(null);
          }}
        >
          <DialogTrigger>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AnnouncementForm
              setAnnouncements={setAnnouncements}
              editAnnouncement={editAnnouncement}
              handleEditAnnouncement={handleEditAnnouncement}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <AnnouncementsList
        announcements={announcements}
        setAnnouncements={setAnnouncements}
        handleEditAnnouncement={handleEditAnnouncement}
      />
    </div>
  );
}
