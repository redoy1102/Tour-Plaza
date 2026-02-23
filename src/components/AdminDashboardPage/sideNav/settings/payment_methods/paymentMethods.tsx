import type { PaymentMethodFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PaymentMethodAddForm from "./PaymentMethodAddForm";
import PageHeader from "../../shared/PageHeader";
import { Button } from "@/components/ui/button";
import PaymentMethodLists from "./PaymentMethodLists";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodFormValue[]
  >([]);
  console.log("All payment methods:", paymentMethods);

  const [editPaymentMethodId, setEditPaymentMethodId] = useState<number | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditPaymentMethod = (paymentMethodId: number | null) => {
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
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PaymentMethodAddForm
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
              editPaymentMethodId={editPaymentMethodId}
              handleEditPaymentMethod={handleEditPaymentMethod}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PaymentMethodLists
        paymentMethods={paymentMethods}
        setPaymentMethods={setPaymentMethods}
        handleEditPaymentMethod={handleEditPaymentMethod}
      />
    </div>
  );
};

export default PaymentMethods;
