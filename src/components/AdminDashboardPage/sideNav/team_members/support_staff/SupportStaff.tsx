import type { SupportStuffFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SupportStaffAddForm from "./SupportStaffAddForm";
import PageHeader from "../../shared/PageHeader";
import CreateButton from "../../shared/CreateButton";
import SupportStaffLists from "./SupportStaffLists";

const SupportStaff = () => {
  const [supportStaff, setSupportStaff] = useState<SupportStuffFormValue[]>([]);
  console.log("All support staff:", supportStaff);

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
            <CreateButton />
          </DialogTrigger>
          <DialogContent>
            <SupportStaffAddForm
              supportStaff={supportStaff}
              setSupportStaff={setSupportStaff}
              editSupportStaffId={editSupportStaffId}
              handleEditSupportStaff={handleEditSupportStaff}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <SupportStaffLists
        supportStaff={supportStaff}
        setSupportStaff={setSupportStaff}
        handleEditSupportStaff={handleEditSupportStaff}
      />
    </div>
  );
};

export default SupportStaff;
