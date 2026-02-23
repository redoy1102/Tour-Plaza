import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SupportStaffAddForm from "./SupportStaffAddForm";
import PageHeader from "../../shared/PageHeader";
import SupportStaffLists from "./SupportStaffLists";
import { Button } from "@/components/ui/button";

const SupportStaff = () => {
  const [editSupportStaffId, setEditSupportStaffId] = useState<number | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditSupportStaff = (supportStaffId: number | null) => {
    setEditSupportStaffId(supportStaffId);
    if (supportStaffId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Support Staff</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditSupportStaffId(null);
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
            <SupportStaffAddForm
              editSupportStaffId={editSupportStaffId}
              handleEditSupportStaff={handleEditSupportStaff}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <SupportStaffLists handleEditSupportStaff={handleEditSupportStaff} />
    </div>
  );
};

export default SupportStaff;
