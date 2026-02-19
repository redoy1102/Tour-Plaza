import type { ToolsFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ToolAddForm from "./ToolAddForm";
import PageHeader from "../../shared/PageHeader";
import CreateButton from "../../shared/CreateButton";
import ToolLists from "./ToolLists";

const Tools = () => {
  const [tools, setTools] = useState<ToolsFormValue[]>([]);
  console.log("All tools:", tools);

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
            <CreateButton />
          </DialogTrigger>
          <DialogContent>
            <ToolAddForm
              tools={tools}
              setTools={setTools}
              editToolId={editToolId}
              handleEditTool={handleEditTool}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ToolLists
        tools={tools}
        setTools={setTools}
        handleEditTool={handleEditTool}
      />
    </div>
  );
};

export default Tools;
