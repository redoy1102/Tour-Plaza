import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateEnrollment } from "@/redux/slices/enrollmentSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const editEnrollmentSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  status: z.enum(["inProgress", "completed"]),
});
type EditEnrollmentFormValue = z.infer<typeof editEnrollmentSchema>;

interface EditEnrollmentDialogProps {
  enrollmentId: string | null;
  setDialogOpen: (open: boolean) => void;
}

const EditEnrollmentDialog = ({
  enrollmentId,
  setDialogOpen,
}: EditEnrollmentDialogProps) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const enrollment = enrollments.find((e) => e.id === enrollmentId);

  const form = useForm<EditEnrollmentFormValue>({
    resolver: zodResolver(editEnrollmentSchema),
    defaultValues: {
      studentId: enrollment?.studentId ?? "",
      status:
        (enrollment?.status as "inProgress" | "completed") ?? "inProgress",
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = (data: EditEnrollmentFormValue) => {
    if (!enrollmentId) return;
    dispatch(updateEnrollment({ id: enrollmentId, ...data }));
    toast.success("Enrollment updated successfully!");
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div>
      <DialogHeader className="mb-4">
        <DialogTitle>Edit Enrollment</DialogTitle>
        <DialogDescription>
          Change the student or status for this enrollment.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Student selector */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.length === 0 ? (
                        <SelectItem value="no-students" disabled>
                          No students registered yet
                        </SelectItem>
                      ) : (
                        students.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name} — {s.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status selector */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer"
            disabled={isSubmitting || !isDirty}
          >
            <Send className="w-4 h-4" />
            Update Enrollment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditEnrollmentDialog;
