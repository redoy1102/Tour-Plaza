import { useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CourseCategoryForm from "./CourseCategoryForm";
import CourseCategoryList from "./CourseCategoryList";
import KbdCreateButton from "../shared/KbdCreateButton";

const CourseCategory = () => {
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditCategory = (categoryId: string | null) => {
    setEditCategoryId(categoryId);
    if (categoryId !== null) {
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        event.preventDefault();
        setEditCategoryId(null);
        setDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            <KbdCreateButton />
          </DialogTrigger>
          <DialogContent>
            <CourseCategoryForm
              editCategoryId={editCategoryId}
              handleEditCategory={handleEditCategory}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CourseCategoryList handleEditCategory={handleEditCategory} />
    </div>
  );
};

export default CourseCategory;
