import { addCourseSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
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
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "../shared/PageHeader";
import CreateButton from "../shared/CreateButton";
import { Textarea } from "@/components/ui/textarea";
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

  const defaultValues = useMemo(
    () => ({
      bannerImage: editCourse?.bannerImage || "",
      bannerVideoLink: editCourse?.bannerVideoLink || "",
      title: editCourse?.title || "",
      description: editCourse?.description || "",
      seo: editCourse?.seo || ["programming", "web development"],
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
      toolsId: editCourse?.toolsIds || [],
      prerequisiteId: editCourse?.prerequisitesIds || [],
      instructorId: editCourse?.instructorsIds || [],
      isFeatured: editCourse?.isFeatured ?? true,
      isFreeCourse: editCourse?.isFreeCourse ?? false,
    }),
    [editCourse]
  );

  const form = useForm<AddCourseFormValue>({
    resolver: zodResolver(addCourseSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

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

  const onSubmit = (data: AddCourseFormValue) => {
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
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Banner video link and title */}
              <div className="flex-1">
                {/* bannerVideoLink */}
                <FormField
                  control={form.control}
                  name="bannerVideoLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Video Link*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter banner video link"
                          {...field}
                        />
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
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* banner image */}
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

            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
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
                      <DayTimePicker
                        value={Array.isArray(field.value) ? field.value : []}
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
                      <DayTimePicker
                        value={Array.isArray(field.value) ? field.value : []}
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

              {/* tool selection (multi-select) */}
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

              {/* support team member selection */}
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
                {courseId ? "Update Course" : "Add Course"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCourseForm;
