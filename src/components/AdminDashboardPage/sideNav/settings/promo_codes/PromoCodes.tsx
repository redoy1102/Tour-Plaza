import { useEffect, useState } from "react";
// import PageHeader from "../shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PromoCodesForm from "./PromoCodesForm";
import PageHeader from "../../shared/PageHeader";
import PromoCodesList from "./PromoCodesList";
import KbdCreateButton from "../../shared/KbdCreateButton";

const PromoCodes = () => {

  const [editPromoCodeId, setEditPromoCodeId] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Alt + N (You can use event.ctrlKey or event.metaKey for Cmd)
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        console.log("Alt + N pressed");
        event.preventDefault();
        setEditPromoCodeId(null);
        setDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditPromoCode = (promoCodeId: string | null) => {
    setEditPromoCodeId(promoCodeId);
    if (promoCodeId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Promo Codes</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditPromoCodeId(null);
          }}
        >
          <DialogTrigger>
            <KbdCreateButton />
          </DialogTrigger>
          <DialogContent>
            <PromoCodesForm
              editPromoCodeId={editPromoCodeId}
              handleEditPromoCode={handleEditPromoCode}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PromoCodesList
        handleEditPromoCode={handleEditPromoCode}
      />
    </div>
  );
};

export default PromoCodes;
