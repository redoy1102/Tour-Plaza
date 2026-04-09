import { promoCodeSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { PromoCodeFormValue } from "@/schemas/admin/adminSchema";
import toast from "react-hot-toast";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleDatePicker from "@/components/shared/SingleDatePicker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPromoCode, updatePromoCode } from "@/redux/slices/promoCodeSlice";

interface PromoCodesFormProps {
  editPromoCodeId?: string | null;
  handleEditPromoCode: (promoCodeId: string | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodesForm = ({
  editPromoCodeId,
  handleEditPromoCode,
  setDialogOpen,
}: PromoCodesFormProps) => {
  const dispatch = useAppDispatch();
  const promoCodes = useAppSelector((state) => state.promoCodes.items);
  const existPromoCode = promoCodes.find((p) => p.id === editPromoCodeId);

  const form = useForm<PromoCodeFormValue>({
    resolver: zodResolver(promoCodeSchema),
    mode: "onChange",
    defaultValues: {
      code: existPromoCode ? existPromoCode.code : "",
      discountPercentage: existPromoCode
        ? existPromoCode.discountPercentage
        : 0,
      startDate: existPromoCode ? existPromoCode.startDate : undefined,
      endDate: existPromoCode ? existPromoCode.endDate : undefined,
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = (data: PromoCodeFormValue) => {
    if (editPromoCodeId !== null) {
      dispatch(updatePromoCode({ id: editPromoCodeId!, data }));

      toast.success("Promo code updated successfully!", {
        id: "edit-promo-code-success",
      });
    } else {
      dispatch(addPromoCode(data));
      toast.success("Promo code created successfully!", {
        id: "add-promo-code-success",
      });
    }

    console.log(data);

    handleEditPromoCode(null);
    setDialogOpen(false);
    form.reset();
  };
  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center space-y-4 p-6"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter promo code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Percentage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter discount percentage"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel> <br />
                <FormControl>
                  <SingleDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel> <br />
                <FormControl>
                  <SingleDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
              disabled={isSubmitting || (editPromoCodeId !== null && !isDirty)}
            >
              <Send className="w-4 h-4" />
              {editPromoCodeId !== null
                ? "Update Promo Code"
                : "Add Promo Code"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PromoCodesForm;
