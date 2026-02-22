import type { PrerequisitesFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
// import PageHeader from "../shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "../../shared/PageHeader";
import CreateButton from "../../shared/CreateButton";
import PrerequisiteList from "./PrerequisiteList";
import PrerequisitesAddForm from "./PrerequisitesAddForm";

const Prerequisites = () => {
  const [prerequisites, setPrerequisites] = useState<PrerequisitesFormValue[]>(
    [],
  );
  console.log("All prerequisites:", prerequisites);

  const [editPrerequisiteId, setEditPrerequisiteId] = useState<number | null>(
    null,
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditPrerequisite = (prerequisiteId: number | null) => {
    setEditPrerequisiteId(prerequisiteId);
    if (prerequisiteId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Prerequisites</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditPrerequisiteId(null);
          }}
        >
          <DialogTrigger>
            <CreateButton />
          </DialogTrigger>
          <DialogContent>
            <PrerequisitesAddForm
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              editPrerequisiteId={editPrerequisiteId}
              handleEditPrerequisite={handleEditPrerequisite}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PrerequisiteList
        prerequisites={prerequisites}
        setPrerequisites={setPrerequisites}
        handleEditPrerequisite={handleEditPrerequisite}
      />
    </div>
  );
};

export default Prerequisites;
