import { faqSchema } from "@/schemas/admin/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FaqFormValue } from "@/schemas/admin/adminSchema";
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
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFaq, updateFaq } from "@/redux/slices/faqSlice";

interface FaqsFormProps {
  editFaqId?: string | null;
  handleEditFaq: (faqId: string | null) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FaqsForm = ({
  editFaqId,
  handleEditFaq,
  setDialogOpen,
}: FaqsFormProps) => {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector((state) => state.faqs.items);
  const existFaq = faqs.find((f) => f.id === editFaqId);

  const form = useForm<FaqFormValue>({
    resolver: zodResolver(faqSchema),
    mode: "onChange",
    defaultValues: {
      faqTitle: existFaq ? existFaq.faqTitle : "",
      faqDescription: existFaq ? existFaq.faqDescription : "",
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = (data: FaqFormValue) => {
    if (editFaqId !== null) {
      dispatch(updateFaq({ id: editFaqId!, data }));
      toast.success("FAQ updated successfully!", {
        id: "edit-faq-success",
      });
    } else {
      dispatch(addFaq(data));
      toast.success("FAQ created successfully!", {
        id: "add-faq-success",
      });
    }

    handleEditFaq(null);
    setDialogOpen(false);
    form.reset();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 items-center space-y-4 p-6"
        >
          <FormField
            control={form.control}
            name="faqTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter FAQ title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faqDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter FAQ answer"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="gap-2 shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
              disabled={isSubmitting || (editFaqId !== null && !isDirty)}
            >
              <Send className="w-4 h-4" />
              {editFaqId !== null ? "Update FAQ" : "Add FAQ"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FaqsForm;
