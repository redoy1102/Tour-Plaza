import { toolsSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { ToolsFormValue } from "@/schemas/admin/adminSchema";
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
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolAddFormProps {
  tools: ToolsFormValue[];
  setTools: React.Dispatch<React.SetStateAction<ToolsFormValue[]>>;
  editToolId?: number | null;
  handleEditTool: (toolId: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolAddForm = ({
  tools,
  setTools,
  editToolId,
  handleEditTool,
  setDialogOpen,
}: ToolAddFormProps) => {
  const defaultValues = useMemo(() => {
    if (editToolId != null && tools[editToolId]) {
      const tool = tools[editToolId];
      return {
        name: tool.name,
        description: tool.description,
        imageFile: tool.imageFile,
      };
    }
    return {
      name: "",
      description: "",
      imageFile: undefined,
    };
  }, [editToolId, tools]);

  const form = useForm<ToolsFormValue>({
    resolver: zodResolver(toolsSchema),
    defaultValues,
  });

  // Watch the imageFile field for preview
  const imagePreview = useWatch({
    control: form.control,
    name: "imageFile",
  });

  // Reset form when editToolId changes
  React.useEffect(() => {
    form.reset(defaultValues);
  }, [editToolId, defaultValues, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5000000) {
        toast.error("Image size must not exceed 5MB");
        event.target.value = "";
        return;
      }

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

  const onSubmit = async (data: ToolsFormValue) => {
    if (editToolId !== null) {
      setTools((prev) =>
        prev.map((tool, index) => (index === editToolId ? data : tool))
      );

      toast.success("Tool updated successfully!", {
        id: "edit-tool-success",
      });
    } else {
      setTools((prev) => [...prev, data]);
      toast.success("Tool created successfully!", {
        id: "add-tool-success",
      });
    }

    console.log(data);

    handleEditTool(null);
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
                  <Input placeholder="Enter tool name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tool description"
                    {...field}
                    rows={3}
                  />
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
          />
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              <Send className="w-4 h-4" />
              {editToolId !== null ? "Update Tool" : "Add Tool"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ToolAddForm;
