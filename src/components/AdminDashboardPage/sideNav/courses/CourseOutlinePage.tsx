import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
// import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
import type { AddCourseFormValue } from "@/schemas/admin/course.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CourseQuiz from "./CourseQuiz";
import CourseAssignment from "./CourseAssignment";

interface ClassFieldsProps {
  nextIndex: number;
  control: Control<AddCourseFormValue>;
}
const ClassFields = ({ nextIndex, control }: ClassFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `courseOutline.${nextIndex}.classes`,
  });

  const watchedClasses = useWatch({
    control,
    name: `courseOutline.${nextIndex}.classes`,
  });
  console.log("Watched classes:", Boolean(watchedClasses));
  console.log("Number of watched classes:", watchedClasses?.length);

  const canAddClass =
    !watchedClasses ||
    watchedClasses.length === 0 ||
    watchedClasses.every((cls) => cls.title?.trim() && cls.ytVideoUrl?.trim());

  return (
    <div className="space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-2">
      {fields.map((item, k) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b pb-4 last:border-0"
        >
          <FormField
            control={control}
            name={`courseOutline.${nextIndex}.classes.${k}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Introduction" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`courseOutline.${nextIndex}.classes.${k}.ytVideoUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium mb-1 block">
                Resources
              </label>
              <Textarea
                {...control.register(
                  `courseOutline.${nextIndex}.classes.${k}.resources`,
                )}
                placeholder="PDF, Links..."
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(k)}
              className="text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ title: "", ytVideoUrl: "", resources: "" })}
        className="w-full border-dashed"
        disabled={!canAddClass}
      >
        <PlusCircle className="w-3 h-3 mr-2" /> Add Class
      </Button>
    </div>
  );
};

interface CourseOutlinePageProps {
  control: Control<AddCourseFormValue>;
}

const CourseOutlinePage = ({ control }: CourseOutlinePageProps) => {
  const watchedOutline = useWatch({ control, name: "courseOutline" });

  const canAddModule = () => {
    if (!watchedOutline || watchedOutline.length === 0) return true;
    return watchedOutline.every((module) => {
      if (!module.moduleTitle?.trim()) return false;
      if (!module.classes || module.classes.length === 0) return false;
      return module.classes.every(
        (cls) => cls.title?.trim() && cls.ytVideoUrl?.trim(),
      );
    });
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courseOutline",
  });

  return (
    <div className="mt-10 space-y-6">
      {/* Header and add module button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Course Outline</h3>
        <Button
          type="button"
          onClick={() =>
            append({
              moduleTitle: "",
              classes: [{ title: "", ytVideoUrl: "", resources: "" }],
              assignment: {
                title: "",
                description: "",
                instruction: "",
                dueDate: new Date(),
                maxMarks: 100,
              },
            })
          }
          className="bg-red-500 hover:bg-red-600"
          disabled={!canAddModule()}
        >
          Add Module
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm p-2"
        >
          <div className="bg-gray-50 p-4 flex gap-4 items-center border-b rounded-xl">
            <span className="font-bold text-gray-400">#{index + 1}</span>

            <Input
              {...control.register(`courseOutline.${index}.moduleTitle`)}
              placeholder="Module Title (e.g., Getting Started)"
              className="bg-white"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(index)}
              className="text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <ClassFields nextIndex={index} control={control} />
          <CourseQuiz control={control} index={index} />
          <CourseAssignment control={control} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CourseOutlinePage;
