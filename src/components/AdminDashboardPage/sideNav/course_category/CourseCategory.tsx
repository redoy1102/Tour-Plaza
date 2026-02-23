import type { CategoryFormValue } from "@/schemas/admin/adminSchema";
import { useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CourseCategoryForm from "./CourseCategoryForm";
import CourseCategoryList from "./CourseCategoryList";
import { Button } from "@/components/ui/button";

const CourseCategory = () => {
  const [categories, setCategories] = useState<CategoryFormValue[]>([]);
  console.log("All categories:", categories);

  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditCategory = (categoryId: number | null) => {
    setEditCategoryId(categoryId);
    if (categoryId !== null) {
      setDialogOpen(true);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Course Categories</PageHeader>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditCategoryId(null);
          }}
        >
          <DialogTrigger>
            {/* <CreateButton /> */}
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CourseCategoryForm
              categories={categories}
              setCategories={setCategories}
              editCategoryId={editCategoryId}
              handleEditCategory={handleEditCategory}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CourseCategoryList
        categories={categories}
        setCategories={setCategories}
        handleEditCategory={handleEditCategory}
      />
    </div>
  );
};

export default CourseCategory;
