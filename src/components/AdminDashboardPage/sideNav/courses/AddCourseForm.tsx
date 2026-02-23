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
import PageHeader from "../shared/PageHeader";
import CreateButton from "../shared/CreateButton";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { TagsInput } from "@/components/ui/tags-input";
import { TimeRangePicker } from "@/components/ui/time-range-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface AddCourseFormProps {
  courses: AddCourseFormValue[];
  setCourses: React.Dispatch<React.SetStateAction<AddCourseFormValue[]>>;
  editCourseId?: number | null;
  handleEditCourse: (courseId: number | null) => void;
}

const AddCourseForm = ({
  courses,
  setCourses,
  editCourseId,
  handleEditCourse,
}: AddCourseFormProps) => {
  const form = useForm<AddCourseFormValue>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      bannerVideoLink:
        editCourseId !== null ? courses[editCourseId!].bannerVideoLink : "",
      title: editCourseId !== null ? courses[editCourseId!].title : "",
      description:
        editCourseId !== null ? courses[editCourseId!].description : "",
      seo:
        editCourseId !== null
          ? courses[editCourseId!].seo
          : ["programming", "web development"],
      liveClassTime:
        editCourseId !== null ? courses[editCourseId!].liveClassTime ?? "" : "",
      price: editCourseId !== null ? courses[editCourseId!].price : 0,
      discount: editCourseId !== null ? courses[editCourseId!].discount : 0,
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
      isFeatured:
        editCourseId !== null ? courses[editCourseId!].isFeatured : true,
      isFreeCourse:
        editCourseId !== null ? courses[editCourseId!].isFreeCourse : false,
      courseDuration:
        editCourseId !== null ? courses[editCourseId!].courseDuration : 1,
    },
  });

  const onSubmit = (data: AddCourseFormValue) => {
    if (editCourseId !== null) {
      setCourses((prev) =>
        prev.map((course, index) => (index === editCourseId ? data : course))
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
    form.reset();
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <PageHeader>Add Course</PageHeader>
        <CreateButton
          route="/admin-dashboard/courses/allCourses"
          btnLabel="Back"
        />
      </div>
      <div className="bg-white rounded-3xl border border-gray-200">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-6"
          >
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
                    <Input placeholder="Enter course title" {...field} />
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
                    <Textarea
                      placeholder="Enter course description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 items-center gap-6">
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

              {/*Batch  start date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Start Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
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

              {/* class time range */}
              <FormField
                control={form.control}
                name="liveClassTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Time</FormLabel>
                    <FormControl>
                      <TimeRangePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* support class time range */}
              <FormField
                control={form.control}
                name="supportClassTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Class Time</FormLabel>
                    <FormControl>
                      <TimeRangePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter course price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* discount */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course discount"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter total live classes"
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
                      <Input
                        type="number"
                        placeholder="Enter total seat"
                        {...field}
                      />
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
                        type="number"
                        placeholder="Enter total pre-recorded classes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* courseDuration */}
              <FormField
                control={form.control}
                name="courseDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Duration</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter course duration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* isFeatured */}
              <FormField
                control={form.control}
                name="isFeatured"
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
                    <FormLabel className="text-sm font-normal">
                      Featured course
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* isFreeCourse */}
              <FormField
                control={form.control}
                name="isFreeCourse"
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
                    <FormLabel className="text-sm font-normal">
                      Free course
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* SEO keywords */}
            <FormField
              control={form.control}
              name="seo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add keyword and press comma or enter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="flex items-center gap-2 mt-12">
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
    </div>
  );
};

export default AddCourseForm;
