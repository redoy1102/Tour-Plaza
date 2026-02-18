import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnnouncementFormValue } from "@/schemas/admin/adminSchema";
import { announcementSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AnnouncementFormProps {
  announcements: AnnouncementFormValue[];
  setAnnouncements: React.Dispatch<
    React.SetStateAction<AnnouncementFormValue[]>
  >;
  editAnnouncement?: number | null;
  handleEditAnnouncement: (announcement: number | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnnouncementForm = ({
  announcements,
  setAnnouncements,
  editAnnouncement,
  handleEditAnnouncement,
  setDialogOpen,
}: AnnouncementFormProps) => {
  const form = useForm<AnnouncementFormValue>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: editAnnouncement !== null ? announcements[editAnnouncement!].title : "",
      description: editAnnouncement !== null ? announcements[editAnnouncement!].description : "",
      type: editAnnouncement !== null ? announcements[editAnnouncement!].type : "general",
    },
  });

  const onSubmit = (data: AnnouncementFormValue) => {
    if (editAnnouncement !== null) {
      // Update existing announcement
      setAnnouncements((prev) =>
        prev.map((ann, index) =>
          index === editAnnouncement
            ? data
            : ann
        )
      );
      toast.success("Announcement updated successfully!", {
        id: "edit-success",
      });
    } else {
      // Add new announcement
      setAnnouncements((prev) => [...prev, data]);
      toast.success("Announcement created successfully!", {
        id: "add-success",
      });
    }
    handleEditAnnouncement(null);
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter announcement title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter announcement description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announcement Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
            >
              <Send className="w-4 h-4" />
              {editAnnouncement ? "Update Announcement" : "Post Announcement"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnnouncementForm;
