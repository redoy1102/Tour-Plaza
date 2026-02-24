import { instructorSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { InstructorFormValue } from "@/schemas/admin/adminSchema";
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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  addInstructor,
  updateInstructor,
} from "@/Redux/slices/instructorSlice";

interface InstructorAddFormProps {
  editInstructorId?: string | null;
  handleEditInstructor: (instructorId: string | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructorAddForm = ({
  editInstructorId,
  handleEditInstructor,
  setDialogOpen,
}: InstructorAddFormProps) => {
  const dispatch = useAppDispatch();
  const instructors = useAppSelector((state) => state.instructors.items);

  const defaultValues = useMemo(() => {
    if (editInstructorId != null) {
      const instructor = instructors.find((i) => i.id === editInstructorId);
      if (instructor) {
        return {
          name: instructor.name,
          role: instructor.role,
          imageFile: instructor.imageFile,
          runningCompanyName: instructor.runningCompanyName,
        };
      }
    }
    return {
      name: "",
      role: "",
      imageFile: undefined,
      runningCompanyName: "",
    };
  }, [editInstructorId, instructors]);

  const form = useForm<InstructorFormValue>({
    resolver: zodResolver(instructorSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  // Watch the imageFile field for preview
  const imagePreview = useWatch({
    control: form.control,
    name: "imageFile",
  });

  // Reset form when editInstructorId changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [editInstructorId, defaultValues, form]);

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

  const onSubmit = async (data: InstructorFormValue) => {
    if (editInstructorId !== null) {
      dispatch(updateInstructor({ id: editInstructorId!, data }));
      toast.success("Instructor updated successfully!", {
        id: "edit-instructor-success",
      });
    } else {
      dispatch(addInstructor(data));
      toast.success("Instructor created successfully!", {
        id: "add-instructor-success",
      });
    }

    handleEditInstructor(null);
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
                  <Input placeholder="Enter instructor name" {...field} />
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
              {editInstructorId !== null
                ? "Update Instructor"
                : "Add Instructor"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InstructorAddForm;
