import type { InstructorFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InstructorAddForm from "./InstructorAddForm";
import PageHeader from "../../shared/PageHeader";
import CreateButton from "../../shared/CreateButton";
import InstructorsList from "./InstructorsList";

const Instructors = () => {
  const [instructors, setInstructors] = useState<InstructorFormValue[]>([]);
  console.log("All instructors:", instructors);

  const [editInstructorId, setEditInstructorId] = useState<number | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditInstructor = (instructorId: number | null) => {
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
            <CreateButton />
          </DialogTrigger>
          <DialogContent>
            <InstructorAddForm
              instructors={instructors}
              setInstructors={setInstructors}
              editInstructorId={editInstructorId}
              handleEditInstructor={handleEditInstructor}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <InstructorsList
        instructors={instructors}
        setInstructors={setInstructors}
        handleEditInstructor={handleEditInstructor}
      />
    </div>
  );
};

export default Instructors;
