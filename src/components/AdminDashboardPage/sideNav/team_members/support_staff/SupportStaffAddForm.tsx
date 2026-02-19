import { supportStuffSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { SupportStuffFormValue } from "@/schemas/admin/adminSchema";
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
import { useEffect } from "react";
import ImageUploader from "../../shared/ImageUploader";

interface SupportStaffAddFormProps {
  supportStaff: SupportStuffFormValue[];
  setSupportStaff: React.Dispatch<
    React.SetStateAction<SupportStuffFormValue[]>
  >;
  editSupportStaffId?: number | null;
  handleEditSupportStaff: (supportStaffId: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupportStaffAddForm = ({
  supportStaff,
  setSupportStaff,
  editSupportStaffId,
  handleEditSupportStaff,
  setDialogOpen,
}: SupportStaffAddFormProps) => {
  const defaultValues = useMemo(() => {
    if (editSupportStaffId != null && supportStaff[editSupportStaffId]) {
      const staff = supportStaff[editSupportStaffId];
      return {
        name: staff.name,
        role: staff.role,
        imageFile: staff.imageFile,
        runningCompanyName: staff.runningCompanyName,
      };
    }
    return {
      name: "",
      role: "",
      imageFile: undefined,
      runningCompanyName: "",
    };
  }, [editSupportStaffId, supportStaff]);

  const form = useForm<SupportStuffFormValue>({
    resolver: zodResolver(supportStuffSchema),
    defaultValues,
  });

  // Watch the imageFile field for preview
  const imagePreview = useWatch({
    control: form.control,
    name: "imageFile",
  });

  // Reset form when editSupportStaffId changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [editSupportStaffId, defaultValues, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        form.setValue("imageFile", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("imageFile", undefined);
  };

  const onSubmit = async (data: SupportStuffFormValue) => {
    if (editSupportStaffId !== null) {
      setSupportStaff((prev) =>
        prev.map((staff, index) =>
          index === editSupportStaffId ? data : staff
        )
      );

      toast.success("Support staff member updated successfully!", {
        id: "edit-support-staff-success",
      });
    } else {
      setSupportStaff((prev) => [...prev, data]);
      toast.success("Support staff member created successfully!", {
        id: "add-support-staff-success",
      });
    }

    console.log(data);

    handleEditSupportStaff(null);
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
                  <Input placeholder="Enter support staff name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFile"
            render={() => (
              <FormItem>
                <FormLabel>Image Upload (Optional)</FormLabel>
                <FormControl>
                  <ImageUploader
                    handleImageChange={handleImageChange}
                    imagePreview={imagePreview}
                    handleRemoveImage={handleRemoveImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="runningCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Running Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
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
              {editSupportStaffId !== null
                ? "Update Support Staff"
                : "Add Support Staff"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SupportStaffAddForm;
