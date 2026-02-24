import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InstructorAddForm from "./InstructorAddForm";
import PageHeader from "../../shared/PageHeader";
import InstructorsList from "./InstructorsList";
import { Button } from "@/components/ui/button";

const Instructors = () => {
  const [editInstructorId, setEditInstructorId] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditInstructor = (instructorId: string | null) => {
    setEditInstructorId(instructorId);
    if (instructorId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Instructors</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditInstructorId(null);
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
            <InstructorAddForm
              editInstructorId={editInstructorId}
              handleEditInstructor={handleEditInstructor}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <InstructorsList handleEditInstructor={handleEditInstructor} />
    </div>
  );
};

export default Instructors;
