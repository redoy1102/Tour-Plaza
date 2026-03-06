import type { AddCourseFormValue } from "@/schemas/admin/course.schema";
import { useFieldArray, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseQuizProps {
  control: Control<AddCourseFormValue>;
  index: number;
}
const CourseQuiz = ({ control, index }: CourseQuizProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `courseOutline.${index}.quizzes`,
  });

  return (
    <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold">Quizzes - {fields.length}</h4>
        <Button
          type="button"
          onClick={() =>
            append({
              question: "",
              options: { opt1: "", opt2: "", opt3: "", opt4: "" },
              answer: undefined,
            })
          }
          className="bg-red-500 hover:bg-red-600 cursor-pointer"
        >
          Add Quiz
        </Button>
      </div>
      {fields.map((item, k) => (
        <div
          key={item.id}
          className="space-y-3 border-b pb-4 last:border-0 grid grid-cols-12 gap-6 items-center"
        >
          <div className="col-span-11">
            {/* Question */}
            <FormField
              control={control}
              name={`courseOutline.${index}.quizzes.${k}.question`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question {k + 1}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter quiz question"
                      className="mb-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={control}
                name={`courseOutline.${index}.quizzes.${k}.options.opt1`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option 1</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Option 1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`courseOutline.${index}.quizzes.${k}.options.opt2`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option 2</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Option 2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`courseOutline.${index}.quizzes.${k}.options.opt3`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option 3</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Option 3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`courseOutline.${index}.quizzes.${k}.options.opt4`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option 4</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Option 4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Correct Answer */}
            <FormField
              control={control}
              name={`courseOutline.${index}.quizzes.${k}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the correct answer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="opt1">Option 1</SelectItem>
                      <SelectItem value="opt2">Option 2</SelectItem>
                      <SelectItem value="opt3">Option 3</SelectItem>
                      <SelectItem value="opt4">Option 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(k)}
            className="text-red-500 col-span-1 cursor-pointer"
          >
            Quiz
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CourseQuiz;
