import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, Loader2, User, BookOpenText } from "lucide-react";
import { toast } from "react-hot-toast";
import { contactSchema, type ContactFormValue } from "@/schemas/contactSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Updated formFields array with grid styling info
const formFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Kazi Atik",
    icon: User,
    gridSpan: "md:col-span-1",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "atik@tourplaza.com",
    icon: Mail,
    gridSpan: "md:col-span-1",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Special honeymoon package inquiry",
    icon: BookOpenText,
    gridSpan: "md:col-span-2",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us about your dream vacation...",
    icon: null,
    gridSpan: "md:col-span-2",
  },
];

const ContactSection = () => {
  const form = useForm<ContactFormValue>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ContactFormValue) => {
    console.log("Contact Form Data:", data);
    const toastId = toast.loading("Sending your message...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Thank you! Your inquiry has been sent.", { id: toastId });
      form.reset();
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("Failed to send message.", { id: toastId });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
            Begin Your Retreat
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
            Connect With <br />{" "}
            <span className="italic text-muted-foreground">Our Concierge</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          <div className="flex-1 flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {formFields.map((fieldData) => {
                    const IconComponent = fieldData.icon as React.ElementType;
                    return (
                      <FormField
                        key={fieldData.name}
                        control={form.control}
                        name={fieldData.name as keyof ContactFormValue}
                        render={({ field }) => (
                          <FormItem
                            className={`relative ${fieldData.gridSpan}`}
                          >
                            <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                              {fieldData.label}
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                {fieldData.icon && (
                                  <IconComponent
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                    size={18}
                                  />
                                )}
                                {fieldData.type === "textarea" ? (
                                  <Textarea
                                    placeholder={fieldData.placeholder}
                                    {...field}
                                    className="min-h-45 rounded-xl p-6 border-slate-200 focus-visible:ring-primary resize-none shadow-sm"
                                  />
                                ) : (
                                  <Input
                                    type={fieldData.type}
                                    placeholder={fieldData.placeholder}
                                    {...field}
                                    className={`h-14 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm ${fieldData.icon ? "pl-12" : "pl-4"}`}
                                  />
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}

                  <div className="md:col-span-2 mt-4">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full md:w-auto px-12 py-7 bg-primary hover:bg-primary-dark rounded-2xl text-xl flex items-center justify-center gap-2 shadow-xl group cursor-pointer transition-colors duration-300"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Send
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                      {isSubmitting ? "Sending..." : "Request Inquiry"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Info Card remains same */}
          <div className="flex-1">
            <div className="h-full relative rounded-[2.5rem] overflow-hidden group shadow-2xl min-h-100">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop"
                alt="Resort"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent flex flex-col justify-end p-12 text-white">
                <div className="space-y-8 mb-2">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <Phone size={22} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-300 font-bold tracking-wider">
                        Direct Line
                      </p>
                      <p className="font-medium text-lg">+91 123 456 7890</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <Mail size={22} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-300 font-bold tracking-wider">
                        Email
                      </p>
                      <p className="font-medium text-lg">contact@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
