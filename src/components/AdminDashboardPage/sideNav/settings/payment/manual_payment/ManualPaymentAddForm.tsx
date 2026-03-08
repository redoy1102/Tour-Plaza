import { paymentMethodSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { PaymentMethodFormValue } from "@/schemas/admin/adminSchema";
import toast from "react-hot-toast";
import React, { useMemo } from "react";
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
import RichTextEditor from "@/components/ui/RichTextEditor";

interface ManualPaymentAddFormProps {
  paymentMethods: PaymentMethodFormValue[];
  setPaymentMethods: React.Dispatch<
    React.SetStateAction<PaymentMethodFormValue[]>
  >;
  editPaymentMethodId?: number | null;
  handleEditPaymentMethod: (paymentMethodId: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManualPaymentAddForm = ({
  paymentMethods,
  setPaymentMethods,
  editPaymentMethodId,
  handleEditPaymentMethod,
  setDialogOpen,
}: ManualPaymentAddFormProps) => {
  const defaultValues = useMemo(() => {
    if (editPaymentMethodId != null && paymentMethods[editPaymentMethodId]) {
      const paymentMethod = paymentMethods[editPaymentMethodId];
      return {
        name: paymentMethod.name,
        description: paymentMethod.description,
        // imageFile: paymentMethod.imageFile,
      };
    }
    return {
      name: "",
      // imageFile: undefined,
    };
  }, [editPaymentMethodId, paymentMethods]);

  const form = useForm<PaymentMethodFormValue>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues,
  });

  // Watch the imageFile field for preview
  // const imagePreview = useWatch({
  //   control: form.control,
  //   name: "imageFile",
  // });

  // Reset form when editPaymentMethodId changes
  React.useEffect(() => {
    form.reset(defaultValues);
  }, [editPaymentMethodId, defaultValues, form]);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     // Validate file size (5MB max)
  //     if (file.size > 5000000) {
  //       toast.error("Image size must not exceed 5MB");
  //       event.target.value = "";
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       form.setValue("imageFile", reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleRemoveImage = () => {
  //   form.setValue("imageFile", undefined);
  // };

  const onSubmit = async (data: PaymentMethodFormValue) => {
    if (editPaymentMethodId !== null) {
      setPaymentMethods((prev) =>
        prev.map((paymentMethod, index) =>
          index === editPaymentMethodId ? data : paymentMethod,
        ),
      );

      toast.success("Payment method updated successfully!", {
        id: "edit-payment-method-success",
      });
    } else {
      setPaymentMethods((prev) => [...prev, data]);
      toast.success("Payment method created successfully!", {
        id: "add-payment-method-success",
      });
    }

    console.log(data);

    handleEditPaymentMethod(null);
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter payment method name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={(content) => field.onChange(content)}
                    height={500}
                    placeholder="Enter course description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="imageFile"
            render={() => (
              <FormItem>
                <FormLabel>Image Upload (Optional)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              <Send className="w-4 h-4" />
              {editPaymentMethodId !== null
                ? "Update Payment Method"
                : "Add Payment Method"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManualPaymentAddForm;
