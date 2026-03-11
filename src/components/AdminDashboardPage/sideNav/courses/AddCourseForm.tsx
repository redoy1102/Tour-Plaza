import { addCourseSchema } from "@/schemas/admin/course.schema";
import type { AddCourseFormValue } from "@/schemas/admin/course.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React, { useEffect, useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHeader from "../shared/PageHeader";
import CreateButton from "../shared/CreateButton";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Calendar } from "@/components/ui/calendar";
import { TagsInput } from "@/components/ui/tags-input";
import DayTimePicker from "@/components/ui/day-time-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWatch } from "react-hook-form";
import ImageUploader from "../shared/ImageUploader";
import MultiSelect from "@/components/ui/multi-select";
import { addCourse, updateCourse } from "@/Redux/slices/courseSlice";
import { useParams, useNavigate } from "react-router-dom";
import CourseOutlinePage from "./CourseOutlinePage";

const AddCourseForm = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.items);
  const categories = useAppSelector((state) => state.categories.items);
  const tools = useAppSelector((state) => state.tools.items);
  const prerequisites = useAppSelector((state) => state.prerequisites.items);
  const instructors = useAppSelector((state) => state.instructors.items);
  const supportStaffs = useAppSelector((state) => state.supportStaff.items);

  const editCourse = useMemo(
    () => courses.find((c) => c.id === courseId),
    [courses, courseId]
  );
  console.log(editCourse);

  // allow `any` here because persisted shape can vary; we normalize below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformCourseOutline = (outline: any[]) => {
    return outline.map((module) => ({
      ...module,
      assignment:
        module.assignment?.map((assignment: any) => ({
          ...assignment,
          dueDate: assignment.dueDate
            ? new Date(assignment.dueDate)
            : new Date(),
        })) || [],
    }));
  };

  const defaultValues = useMemo(
    () => ({
      bannerImage: editCourse?.bannerImage || "",
      bannerVideoLink: editCourse?.bannerVideoLink || "",
      title: editCourse?.title || "",
      description: editCourse?.description || "",
      tags: editCourse?.tags || ["programming", "web development"],
      liveClassTime: editCourse?.liveClassTime || [],
      supportClassTime: editCourse?.supportClassTime || [],
      price: editCourse?.price || 0,
      discount: editCourse?.discount || 0,
      totalLiveClasses: editCourse?.totalLiveClasses || 1,
      totalPreRecordedClasses: editCourse?.totalPreRecordedClasses || 0,
      startDate: editCourse?.startDate
        ? new Date(editCourse.startDate)
        : undefined,
      totalSeat: editCourse?.totalSeat || 1,
      batchNumber: editCourse?.batchNumber || 1,
      courseDuration: editCourse?.courseDuration || 1,
      categoryId: editCourse?.categoryId || "",
      toolsIds: editCourse?.toolsIds || [],
      prerequisitesIds: editCourse?.prerequisitesIds || [],
      instructorsIds: editCourse?.instructorsIds || [],
      supportStaffs: editCourse?.supportStaffs || [],
      isFeatured: editCourse?.isFeatured ?? true,
      isLiveCourse: editCourse?.isLiveCourse ?? false,
      isPreRecordedCourse: editCourse?.isPreRecordedCourse ?? false,
      courseOutline: editCourse?.courseOutline
        ? transformCourseOutline(editCourse.courseOutline)
        : [],
    }),
    [editCourse]
  );

  const form = useForm<AddCourseFormValue>({
    resolver: zodResolver(addCourseSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues,
  });

  const { isSubmitting, isDirty } = form.formState;
  if (isSubmitting) {
    console.log("Form is submitting...");
  } else {
    console.log("Form is not submitting");
  }
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const bannerImagePreview = useWatch({
    control: form.control,
    name: "bannerImage",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      form.setValue("bannerImage", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      form.setValue("bannerImage", reader.result as string, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    form.setValue("bannerImage", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: AddCourseFormValue) => {
    try {
      if (courseId) {
        dispatch(updateCourse({ id: courseId, data }));
        toast.success("Course updated successfully!", {
          id: "edit-course-success",
        });
      } else {
        dispatch(addCourse(data));
        toast.success("Course created successfully!", {
          id: "add-course-success",
        });
      }

      console.log(data);
      navigate("/admin-dashboard/courses/allCourses");
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <PageHeader>{courseId ? "Edit Course" : "Add Course"}</PageHeader>
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
            <div className="border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* isLiveCourse */}
              <FormField
                control={form.control}
                name="isLiveCourse"
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
                      Live course
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* isPreRecordedCourse */}
              <FormField
                control={form.control}
                name="isPreRecordedCourse"
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
                      Pre-recorded course
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* category selection */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* instructor selection */}
              <FormField
                control={form.control}
                name="instructorsIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={instructors.map((i) => ({
                          id: i.id,
                          name: i.name,
                        }))}
                        value={Array.isArray(field.value) ? field.value : []}
                        onChange={(vals) => field.onChange(vals)}
                        placeholder="Select instructors "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* tools selection (multi-select) */}
              <FormField
                control={form.control}
                name="toolsIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={tools.map((t) => ({ id: t.id, name: t.name }))}
                        value={Array.isArray(field.value) ? field.value : []}
                        onChange={(vals) => field.onChange(vals)}
                        placeholder="Select tools"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* prerequisite selection */}
              <FormField
                control={form.control}
                name="prerequisitesIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prerequisites</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={prerequisites.map((p) => ({
                          id: p.id,
                          name: p.title,
                        }))}
                        value={Array.isArray(field.value) ? field.value : []}
                        onChange={(vals) => field.onChange(vals)}
                        placeholder="Select prerequisites"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border border-gray-100 rounded-2xl p-6">
              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {/* price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Price*</FormLabel>
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
                      <FormLabel>Discount Price</FormLabel>
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

                {/* thumbnail */}
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="bannerImage"
                    render={() => (
                      <FormItem>
                        <FormLabel>Thumbnail*</FormLabel>
                        <FormControl>
                          <ImageUploader
                            handleImageChange={handleImageChange}
                            imagePreview={bannerImagePreview}
                            handleRemoveImage={handleRemoveImage}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 space-y-3">
              {/* bannerVideoLink */}
              <FormField
                control={form.control}
                name="bannerVideoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Video Link*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter banner video link" {...field} />
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
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value || ""}
                        onChange={(content) => field.onChange(content)}
                        height={500}
                        placeholder="Enter course description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Live class time */}
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="liveClassTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Class Time</FormLabel>
                      <FormControl>
                        <DayTimePicker
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* support class time */}
              <div className="">
                <FormField
                  control={form.control}
                  name="supportClassTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Class Time</FormLabel>
                      <FormControl>
                        <DayTimePicker
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* support team member selection */}
              <div className="">
                <FormField
                  control={form.control}
                  name="supportStaffs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Team Member</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={supportStaffs.map((i) => ({
                            id: i.id,
                            name: i.name,
                          }))}
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={(vals) => field.onChange(vals)}
                          placeholder="Select support team members"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* course Duration */}
              <div>
                <FormField
                  control={form.control}
                  name="courseDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration (Month)</FormLabel>
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
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 ">
              <div className="grid grid-cols-2 gap-4">
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

                <div className="mt-2">
                  {/*Batch  start date */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batch Start Date</FormLabel>
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
              </div>

              <div className="grid grid-cols-3 gap-3 mt-2">
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
              </div>
            </div>

            {/* SEO keywords */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add tag and press comma or enter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CourseOutlinePage control={form.control} />

            {/* Submit button */}
            <div className="flex items-center gap-2 mt-12">
              <Button
                type="submit"
                disabled={isSubmitting || (!!courseId && !isDirty)}
                className={`gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl ${
                  isSubmitting ? "opacity-70 pointer-events-none" : ""
                }`}
                aria-busy={isSubmitting}
              >
                {isSubmitting && (
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                )}
                {courseId
                  ? isSubmitting
                    ? "Updating..."
                    : "Update Course"
                  : isSubmitting
                  ? "Saving..."
                  : "Add Course"}
              </Button>
            </div>

            {/* Replace the JSON.stringify block with this */}
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="text-red-500 text-sm mt-4 p-4 bg-red-50 rounded-lg">
                <p className="font-bold mb-2">
                  Please fix the following errors:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(form.formState.errors).map(([key, error]) => (
                    <li key={key}>
                      <span className="capitalize font-medium">{key}:</span>{" "}
                      {error?.message?.toString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCourseForm;
