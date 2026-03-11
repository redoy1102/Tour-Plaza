import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "../../shared/PageHeader";
import FaqsForm from "./FaqsForm.tsx";
import FaqsList from "./FaqsList.tsx";
import KbdCreateButton from "../../shared/KbdCreateButton";

const Faqs = () => {
  const [editFaqId, setEditFaqId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        event.preventDefault();
        setEditFaqId(null);
        setDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditFaq = (faqId: string | null) => {
    setEditFaqId(faqId);
    if (faqId !== null) {
      setDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>FAQs</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditFaqId(null);
          }}
        >
          <DialogTrigger>
            <KbdCreateButton />
          </DialogTrigger>
          <DialogContent>
            <FaqsForm
              editFaqId={editFaqId}
              handleEditFaq={handleEditFaq}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <FaqsList handleEditFaq={handleEditFaq} />
    </div>
  );
};

export default Faqs;
