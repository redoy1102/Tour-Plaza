import { categorySchema } from "@/schemas/admin/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CategoryFormValue } from "@/schemas/admin/category.schema";
import toast from "react-hot-toast";
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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { updateCategory, addCategory } from "@/Redux/slices/categorySlice";

interface CourseCategoryFormProps {
  editCategoryId?: string | null;
  handleEditCategory: (categoryId: string | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseCategoryForm = ({
  editCategoryId,
  handleEditCategory,
  setDialogOpen,
}: CourseCategoryFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name:
        editCategoryId !== null
          ? categories.find((c) => c.id === editCategoryId!)?.name || ""
          : "",
    },
  });

  const onSubmit = (data: CategoryFormValue) => {
    if (editCategoryId !== null) {
      dispatch(updateCategory({ id: editCategoryId!, data }));

      toast.success("Category updated successfully!", {
        id: "edit-category-success",
      });
    } else {
      dispatch(addCategory(data));

      toast.success("Category created successfully!", {
        id: "add-category-success",
      });
    }

    handleEditCategory(null);
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
                  <Input placeholder="Enter category name" {...field} />
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
              {editCategoryId !== null ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseCategoryForm;
