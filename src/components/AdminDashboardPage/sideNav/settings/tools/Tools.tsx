import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ToolAddForm from "./ToolAddForm";
import PageHeader from "../../shared/PageHeader";
import { Button } from "@/components/ui/button";
import ToolLists from "./ToolLists";

const Tools = () => {
  const [editToolId, setEditToolId] = useState<number | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditTool = (toolId: number | null) => {
    setEditToolId(toolId);
    if (toolId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Tools</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditToolId(null);
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
            <ToolAddForm
              editToolId={editToolId}
              handleEditTool={handleEditTool}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ToolLists
        handleEditTool={handleEditTool}
      />
    </div>
  );
};

export default Tools;
