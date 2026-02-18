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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface PromoCodesFormProps {
  promoCodes: PromoCodeFormValue[];
  setPromoCodes: React.Dispatch<React.SetStateAction<PromoCodeFormValue[]>>;
  editPromoCodeId?: number | null;
  handleEditPromoCode: (promoCodeId: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodesForm = ({
  promoCodes,
  setPromoCodes,
  editPromoCodeId,
  handleEditPromoCode,
  setDialogOpen,
}: PromoCodesFormProps) => {
  const form = useForm<PromoCodeFormValue>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      code: editPromoCodeId !== null ? promoCodes[editPromoCodeId!].code : "",
      discountPercentage:
        editPromoCodeId !== null
          ? promoCodes[editPromoCodeId!].discountPercentage
          : 0,
      validity:
        editPromoCodeId !== null
          ? promoCodes[editPromoCodeId!].validity
          : undefined,
    },
  });

  const onSubmit = (data: PromoCodeFormValue) => {
    if (editPromoCodeId !== null) {
      setPromoCodes((prev) =>
        prev.map((promoCode, index) =>
          index === editPromoCodeId ? data : promoCode
        )
      );

      toast.success("Promo code updated successfully!", {
        id: "edit-promo-code-success",
      });
    } else {
      setPromoCodes((prev) => [...prev, data]);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
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
            name="validity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validity (Optional)</FormLabel> <br />
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-53 p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
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
