// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

import BranchLocations from "./components/BranchLocations";
import Contacts from "./components/Contacts";
import Header from "./components/Header";
import Map from "./components/Map";

const ContactSection = () => {
  // const [contactFormData, setContactFormData] = useState({
  //   name: "",
  //   email: "",
  //   subject: "",
  //   message: "",
  // });

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setContactFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!contactFormData.name) {
  //     toast.error("Please enter your name.");
  //     return;
  //   }

  //   if (!contactFormData.email) {
  //     toast.error("Please enter your email.");
  //     return;
  //   }

  //   if (!contactFormData.subject) {
  //     toast.error("Please enter the subject.");
  //     return;
  //   }

  //   if (!contactFormData.message) {
  //     toast.error("Please enter your message.");
  //     return;
  //   }

  //   // Handle form submission logic here
  //   console.log("Form Data Submitted: ", contactFormData);
  // };

  return (
    <div className="pt-32 pb-12 min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto">
        {/* Header */}
        <Header />

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Side: Contact Info & Form */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
            {/* Contact Cards */}
            <Contacts />

            {/* Quick Message Form */}
            {/* <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
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
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary text-white font-bold text-lg cursor-pointer">
                  বার্তা পাঠান
                </Button>
              </form>
            </div> */}
          </div>

          {/* Right Side: Map */}
          <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
            <Map />
          </div>
        </div>

        <BranchLocations />
      </div>
    </div>
  );
};

export default ContactSection;
