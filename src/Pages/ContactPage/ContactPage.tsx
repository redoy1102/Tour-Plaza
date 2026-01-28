import { Phone, MessageCircle, Mail, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Map from "@/components/contactPage/Map";

const ContactPage = () => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormData.name) {
      toast.error("Please enter your name.");
      return;
    }

    if (!contactFormData.email) {
      toast.error("Please enter your email.");
      return;
    }

    if (!contactFormData.subject) {
      toast.error("Please enter the subject.");
      return;
    }

    if (!contactFormData.message) {
      toast.error("Please enter your message.");
      return;
    }

    // Handle form submission logic here
    console.log("Form Data Submitted: ", contactFormData);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-[#1e3a5f]" />,
      label: "Bangladesh",
      value: "+8801711-270465",
      actionLabel: "Call",
      href: "tel:+8801711270465",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-[#1e3a5f]" />,
      label: "Bangladesh (WhatsApp)",
      value: "+8801711-270465",
      actionLabel: "Call",
      href: "https://wa.me/8801711270465",
    },
    {
      icon: <Mail className="h-6 w-6 text-[#1e3a5f]" />,
      label: "Email",
      value: "emanagerit@gmail.com",
      actionLabel: "Email",
      href: "mailto:emanagerit@gmail.com",
    },
  ];

  const branchOffices = [
    {
      title: "Head Quarter",
      address: "House:- 06, Road:- 2/B, Block:- J, Baridhara, Dhaka-1212",
      mapLink: "https://www.google.com/maps/search/Baridhara+Dhaka+1212",
    },
    {
      title: "Chittagong Office",
      address:
        "Flat No. D1, 4th Floor, House# M.R Tower, Road#07, Nasirabad Properties R/A, Khulshi, Chittagong, Bangladesh",
      mapLink:
        "https://www.google.com/maps/search/Nasirabad+Khulshi+Chittagong",
    },
    {
      title: "Sylhet Office",
      address: "Ali vhabon Airport Road Mojumdhary, Sylhet, Bangladesh",
      mapLink:
        "https://www.google.com/maps/search/Airport+Road+Sylhet+Bangladesh",
    },
    {
      title: "Rangpur Office",
      address: "BRB Cable Building, Central Road, Rangpur.",
      mapLink: "https://www.google.com/maps/search/BRB+Cable+Building+Rangpur",
    },
    {
      title: "USA Office",
      address: "3rd Floor, Brooklyn, NY-11208.",
      mapLink: "https://www.google.com/maps/search/Brooklyn+NY+11208",
    },
    {
      title: "UK Office",
      address:
        "George Stephnson IND Estate, Killingworth, Newcastle Upon Tyne NE12 6Ds Uk",
      mapLink:
        "https://www.google.com/maps/search/Killingworth+Newcastle+Upon+Tyne",
    },
    {
      title: "Germany Office",
      address: "Seumestr 27, 10245 Berlin, Germany",
      mapLink: "https://www.google.com/maps/search/Seumestr+27+10245+Berlin",
    },
    {
      title: "Dubai Office",
      address:
        "Somalia Building Freej Al Murar, Al Murar-Deira, Dubai-21555, United Arab Emirates.",
      mapLink: "https://www.google.com/maps/search/Al+Murar+Deira+Dubai",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-12 xl:px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            আমাদের সাথে <span className="text-blue-600">যোগাযোগ করুন</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            আপনার যেকোনো জিজ্ঞাসা বা পরমর্শের জন্য আমাদের সাথে যোগাযোগ করতে
            পারেন। আমরা সবসময় আপনার সহযোগিতায় প্রস্তুত।
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Side: Contact Info & Form */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        {info.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {info.value}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#1e3a5f] font-bold text-lg px-4 group-hover:underline uppercase tracking-wide">
                    {info.actionLabel}
                  </span>
                </a>
              ))}
            </div>

            {/* Quick Message Form */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Send className="h-6 w-6 text-secondary" />
                দ্রুত বার্তা পাঠান
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="আপনার নাম"
                    className="rounded-xl h-12"
                    onChange={handleInputChange}
                  />
                  <Input
                    name="email"
                    placeholder="আপনার ইমেইল"
                    className="rounded-xl h-12"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  name="subject"
                  placeholder="বিষয়"
                  className="rounded-xl h-12"
                  onChange={handleInputChange}
                />
                <textarea
                  name="message"
                  placeholder="আপনার বার্তা..."
                  className="w-full min-h-30 p-4 rounded-xl border border-input bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus:border-blue-500 transition-colors"
                  onChange={handleInputChange}
                ></textarea>
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-[#2d5078] text-white font-bold text-lg cursor-pointer">
                  বার্তা পাঠান
                </Button>
              </form>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
            <Map />
          </div>
        </div>

        {/* Branch Locations Section */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Our Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchOffices.map((office, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 group relative flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {office.title}
                    </h3>
                    <a
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on Google Maps"
                      className="relative p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shrink-0 group/map"
                    >
                      <span className="absolute inset-0 rounded-xl bg-blue-400 opacity-20 animate-ping group-hover/map:hidden"></span>
                      <MapPin className="h-4 w-4 relative z-10" />
                    </a>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[14px]">
                    {office.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
