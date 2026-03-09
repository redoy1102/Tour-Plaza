import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "../../../shared/PageHeader";
import ManualPaymentAddForm from "./ManualPaymentAddForm";
import ManualPaymentLists from "./ManualPaymentLists";
import KbdCreateButton from "../../../shared/KbdCreateButton";

const ManualPayment = () => {
  const [editPaymentMethodId, setEditPaymentMethodId] = useState<string | null>(
    null,
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        event.preventDefault();
        setEditPaymentMethodId(null);
        setDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditPaymentMethod = (paymentMethodId: string | null) => {
    setEditPaymentMethodId(paymentMethodId);
    if (paymentMethodId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Payment Methods</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditPaymentMethodId(null);
          }}
        >
          <DialogTrigger>
            <KbdCreateButton />
          </DialogTrigger>
          <DialogContent>
            <ManualPaymentAddForm
              editPaymentMethodId={editPaymentMethodId}
              handleEditPaymentMethod={handleEditPaymentMethod}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ManualPaymentLists
        handleEditPaymentMethod={handleEditPaymentMethod}
      />
    </div>
  );
};

export default ManualPayment;
