import { type Control } from "react-hook-form";
import type { AddCourseFormValue } from "@/schemas/admin/course.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CourseAssignmentProps {
  control: Control<AddCourseFormValue>;
  index: number;
}

const CourseAssignment = ({ control, index }: CourseAssignmentProps) => {
  return (
    <div className="space-y-4 p-4 bg-green-50/50 rounded-xl border border-green-100 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold">Assignment</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`courseOutline.${index}.assignment.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter assignment title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`courseOutline.${index}.assignment.maxMarks`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Marks</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={`courseOutline.${index}.assignment.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Assignment description" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`courseOutline.${index}.assignment.instruction`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instruction</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Instruction" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`courseOutline.${index}.assignment.dueDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <br />
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-53 p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseAssignment;
