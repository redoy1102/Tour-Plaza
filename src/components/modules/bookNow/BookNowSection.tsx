import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleDatePicker } from "@/components/ui/single-date-picker";
import {
  Send,
  Phone,
  User,
  Users,
  BedDouble,
  CalendarDays,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { bookingSchema, type BookingFormValue } from "@/schemas/bookingSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoomsVillasData } from "@/data/roomsVillasData";
import PageHeader from "@/components/shared/PageHeader";

const BookNowSection = () => {
  const form = useForm<BookingFormValue>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      whatsAppNumber: "",
      email: "",
      roomId: "",
      guests: 1,
      checkInDate: undefined,
      checkOutDate: undefined,
      specialRequests: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: BookingFormValue) => {
    console.log("Booking Form Data:", data);
    const toastId = toast.loading("Submitting your reservation...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Reservation request submitted successfully!", {
        id: toastId,
      });
      form.reset();
    } catch (error) {
      console.log("Error submitting reservation:", error);
      toast.error("Failed to submit reservation.", { id: toastId });
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <PageHeader
        imgLink="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop"
        title="Book Your Stay"
        description="Reserve your dream room at Tour Plaza resort"
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          {/* Section heading */}
          <div className="max-w-xl mx-auto text-center mb-10 md:mb-16">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
              Reserve Now
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
              Make a{" "}
              <span className="italic text-muted-foreground">Reservation</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
            {/* Form */}
            <div className="flex-1 flex flex-col justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-6">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                size={18}
                              />
                              <Input
                                type="text"
                                placeholder="John Doe"
                                {...field}
                                className="h-14 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm pl-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* WhatsApp Number */}
                    <FormField
                      control={form.control}
                      name="whatsAppNumber"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            WhatsApp Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                size={18}
                              />
                              <Input
                                type="tel"
                                placeholder="+8801XXXXXXXXX"
                                {...field}
                                className="h-14 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm pl-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email (optional) */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            Email{" "}
                            <span className="text-muted-foreground normal-case tracking-normal">
                              (optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                size={18}
                              />
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                                className="h-14 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm pl-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Number of Guests */}
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            Number of Guests
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                size={18}
                              />
                              <Input
                                type="number"
                                min={1}
                                max={20}
                                placeholder="2"
                                {...field}
                                className="h-14 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm pl-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Room Selection */}
                    <FormField
                      control={form.control}
                      name="roomId"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            Select Room / Villa
                          </FormLabel>
                          <FormControl>
                            <div className="relative mt-1">
                              <BedDouble
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent z-10"
                                size={18}
                              />
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="h-14 rounded-xl border-slate-200 focus:ring-primary shadow-sm pl-12 cursor-pointer">
                                  <SelectValue placeholder="Choose a room or villa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {RoomsVillasData.map((room) => (
                                    <SelectItem
                                      key={room.id}
                                      value={String(room.id)}
                                    >
                                      {room.name} — {room.category} ($
                                      {room.price}/night)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Check-in Date */}
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            <span className="flex items-center gap-1.5 mb-2">
                              <CalendarDays size={14} />
                              Check-in Date
                            </span>
                          </FormLabel>
                          <FormControl>
                            <SingleDatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select check-in date"
                              className="h-14 rounded-xl border-slate-200 focus:ring-primary shadow-sm"
                              disabled={(date) => date < today}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Check-out Date */}
                    <FormField
                      control={form.control}
                      name="checkOutDate"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            <span className="flex items-center gap-1.5 mb-2">
                              <CalendarDays size={14} />
                              Check-out Date
                            </span>
                          </FormLabel>
                          <FormControl>
                            <SingleDatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select check-out date"
                              className="h-14 rounded-xl border-slate-200 focus:ring-primary shadow-sm"
                              disabled={(date) => {
                                const checkIn = form.getValues("checkInDate");
                                return checkIn ? date <= checkIn : date < today;
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Special Requests */}
                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-semibold uppercase text-[#0F172A] tracking-wider">
                            Special Requests{" "}
                            <span className="text-muted-foreground normal-case tracking-normal">
                              (optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare
                                className="absolute left-4 top-4 text-accent"
                                size={18}
                              />
                              <Textarea
                                placeholder="Any dietary requirements, accessibility needs, celebrations..."
                                {...field}
                                className="min-h-32 rounded-xl p-6 pl-12 border-slate-200 focus-visible:ring-primary resize-none shadow-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit */}
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
                        {isSubmitting ? "Submitting..." : "Confirm Reservation"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            {/* Side image card */}
            <div className="flex-1 hidden lg:block">
              <div className="h-full relative rounded-[2.5rem] overflow-hidden group shadow-2xl min-h-150">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop"
                  alt="Resort Room"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent flex flex-col justify-end p-12 text-white">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold">
                      Your Getaway Awaits
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                      From luxurious villas with private pools to cozy rooms
                      with stunning views — find your perfect retreat at Tour
                      Plaza.
                    </p>
                    <div className="flex gap-6 pt-2">
                      <div>
                        <p className="text-3xl font-bold text-accent">20+</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                          Rooms & Villas
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-accent">4.9</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                          Guest Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNowSection;
