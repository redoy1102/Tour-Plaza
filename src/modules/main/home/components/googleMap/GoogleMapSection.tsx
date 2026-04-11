import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Globe } from "lucide-react";

const MapSection = () => {
  // Your resort's specific Google Maps embed URL
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.4725456426463!2d88.29980147596001!3d22.61426313101298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8834aa09bb3b3%3A0xbf3e5be6e049b997!2sTour%20Plaza!5e0!3m2!1sen!2sbd!4v1711820000000!5m2!1sen!2sbd";

  return (
    <section className="relative bg-background overflow-hidden w-full">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">
            Location & Access
          </span>
          <h2 className="mt-3 text-4xl font-serif text-[#0F172A]">
            Find Your Way to Paradise
          </h2>
        </div>

        {/* Map Container with Border View */}
        <div className="relative group overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl h-150">
          {/* The Live Map */}
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[0.95] group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            // allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tour Plaza Location"
          ></iframe>

          {/* Floating Address Card (Glassmorphism) */}
          <div className="absolute top-8 left-8 z-10 w-full max-w-sm p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl hidden md:block">
            <h3 className="text-2xl font-serif text-[#0F172A] mb-4">
              Tour Plaza
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-primary shrink-0" size={20} />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  31, Rabindra sarani, Khaldhar Para, Balitikuri, Howrah, West
                  Bengal 711113, India
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Globe className="text-primary shrink-0" size={20} />
                <a
                  href="http://www.tourplaza.wuaze.com/"
                  target="_blank"
                  className="text-sm text-sky-600 hover:underline"
                >
                  Official Website
                </a>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/80 rounded-xl h-12">
                <Navigation className="mr-2" size={16} />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
