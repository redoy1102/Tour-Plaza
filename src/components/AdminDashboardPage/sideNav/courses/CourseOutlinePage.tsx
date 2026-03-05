import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";

interface ClassFieldsProps {
  nextIndex: number;
  control: Control<AddCourseFormValue>;
}
const ClassFields = ({ nextIndex, control }: ClassFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `courseOutline.${nextIndex}.classes`,
  });

  return (
    <div className="space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-2">
      {fields.map((item, k) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end border-b pb-4 last:border-0"
        >
          <div>
            <label className="text-xs font-medium mb-1 block">
              Class Title
            </label>
            <Input
              {...control.register(
                `courseOutline.${nextIndex}.classes.${k}.title`
              )}
              placeholder="Introduction"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Video URL</label>
            <Input
              {...control.register(
                `courseOutline.${nextIndex}.classes.${k}.ytVideoUrl`
              )}
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium mb-1 block">
                Resources
              </label>
              <Textarea
                {...control.register(
                  `courseOutline.${nextIndex}.classes.${k}.resources`
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courseOutline",
  });

  return (
    <div className="mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Course Outline</h3>
        <Button
          type="button"
          onClick={() =>
            append({
              moduleTitle: "",
              classes: [{ title: "", ytVideoUrl: "", resources: "" }],
            })
          }
          className="bg-red-500 hover:bg-red-600"
        >
          Add Module
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          <div className="bg-gray-50 p-4 flex gap-4 items-center border-b">
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
        </div>
      ))}
    </div>
  );
};

export default CourseOutlinePage;
