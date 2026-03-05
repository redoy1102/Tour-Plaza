import { prerequisitesSchema } from "@/schemas/admin/prerequisites.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { PrerequisitesFormValue } from "@/schemas/admin/prerequisites.schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lucideIcons, getIcon } from "@/data/icons";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  addPrerequisite,
  updatePrerequisite,
} from "@/Redux/slices/prerequisitesSlice";

interface PrerequisitesFormProps {
  editPrerequisiteId?: string | null;
  handleEditPrerequisite: (prerequisiteId: string | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrerequisitesAddForm = ({
  editPrerequisiteId,
  handleEditPrerequisite,
  setDialogOpen,
}: PrerequisitesFormProps) => {
  const dispatch = useAppDispatch();
  const prerequisites = useAppSelector((state) => state.prerequisites.items);

  const form = useForm<PrerequisitesFormValue>({
    resolver: zodResolver(prerequisitesSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title:
        editPrerequisiteId !== null
          ? prerequisites.find((p) => p.id === editPrerequisiteId)?.title || ""
          : "",
      icon:
        editPrerequisiteId !== null
          ? prerequisites.find((p) => p.id === editPrerequisiteId)?.icon || ""
          : "",
    },
  });

  const onSubmit = (data: PrerequisitesFormValue) => {
    if (editPrerequisiteId !== null) {
      dispatch(updatePrerequisite({ id: editPrerequisiteId!, data }));
      toast.success("Prerequisite updated successfully!", {
        id: "edit-prerequisite-success",
      });
    } else {
      dispatch(addPrerequisite(data));
      toast.success("Prerequisite created successfully!", {
        id: "add-prerequisite-success",
      });
    }

    handleEditPrerequisite(null);
    setDialogOpen(false);
    form.reset();
  };
  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Icon</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose an icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lucideIcons.map((iconName) => {
                      const IconComponent = getIcon(iconName);
                      return (
                        <SelectItem key={iconName} value={iconName}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            <span>{iconName}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter prerequisite title" {...field} />
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
              {editPrerequisiteId !== null
                ? "Update Prerequisite"
                : "Add Prerequisite"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PrerequisitesAddForm;
