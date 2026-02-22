import { addCourseSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
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
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCourseFormProps {
  courses: AddCourseFormValue[];
  setCourses: React.Dispatch<React.SetStateAction<AddCourseFormValue[]>>;
  editCourseId?: number | null;
  handleEditCourse: (courseId: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCourseForm = ({
  courses,
  setCourses,
  editCourseId,
  handleEditCourse,
  setDialogOpen,
}: AddCourseFormProps) => {
  const form = useForm<AddCourseFormValue>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      bannerVideoLink:
        editCourseId !== null ? courses[editCourseId!].bannerVideoLink : "",
      title: editCourseId !== null ? courses[editCourseId!].title : "",
      description:
        editCourseId !== null ? courses[editCourseId!].description : "",
      price: editCourseId !== null ? courses[editCourseId!].price : 0,
      totalLiveClasses:
        editCourseId !== null ? courses[editCourseId!].totalLiveClasses : 1,
      totalPreRecordedClasses:
        editCourseId !== null
          ? courses[editCourseId!].totalPreRecordedClasses
          : 0,
      startDate:
        editCourseId !== null && courses[editCourseId!].startDate
          ? new Date(courses[editCourseId!].startDate!)
          : undefined,
      totalSeat: editCourseId !== null ? courses[editCourseId!].totalSeat : 1,
      batchNumber:
        editCourseId !== null ? courses[editCourseId!].batchNumber : 1,
      isLive: editCourseId !== null ? courses[editCourseId!].isLive : false,
    },
  });

  const onSubmit = (data: AddCourseFormValue) => {
    if (editCourseId !== null) {
      setCourses((prev) =>
        prev.map((course, index) => (index === editCourseId ? data : course)),
      );

      toast.success("Course updated successfully!", {
        id: "edit-course-success",
      });
    } else {
      setCourses((prev) => [...prev, data]);
      toast.success("Course created successfully!", {
        id: "add-course-success",
      });
    }

    console.log(data);

    handleEditCourse(null);
    setDialogOpen(false);
    form.reset();
  };
  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
          {/* bannerVideoLink */}
          <FormField
            control={form.control}
            name="bannerVideoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Video Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner video link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* title */}
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

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* totalLiveClasses */}
          <FormField
            control={form.control}
            name="totalLiveClasses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Live Classes</FormLabel>
                <FormControl>
                  <Input placeholder="Enter total live classes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* totalPreRecordedClasses */}
          <FormField
            control={form.control}
            name="totalPreRecordedClasses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Pre-Recorded Classes</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter total pre-recorded classes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* totalSeat */}
          <FormField
            control={form.control}
            name="totalSeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Seat</FormLabel>
                <FormControl>
                  <Input placeholder="Enter total seat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* batchNumber */}
          <FormField
            control={form.control}
            name="batchNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter batch number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isLive */}
          <FormField
            control={form.control}
            name="isLive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">Is Live?</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              <Send className="w-4 h-4" />
              {editCourseId !== null ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCourseForm;
