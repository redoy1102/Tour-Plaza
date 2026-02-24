import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "../../shared/PageHeader";
import { Button } from "@/components/ui/button";
import PrerequisiteList from "./PrerequisiteList";
import PrerequisitesAddForm from "./PrerequisitesAddForm";

const Prerequisites = () => {
  const [editPrerequisiteId, setEditPrerequisiteId] = useState<string | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditPrerequisite = (prerequisiteId: string | null) => {
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
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PrerequisitesAddForm
              editPrerequisiteId={editPrerequisiteId}
              handleEditPrerequisite={handleEditPrerequisite}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PrerequisiteList handleEditPrerequisite={handleEditPrerequisite} />
    </div>
  );
};

export default Prerequisites;
