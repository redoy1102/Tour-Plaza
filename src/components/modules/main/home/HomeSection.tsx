import HeroSection from "@/components/modules/main/home/components/hero/HeroSection";
import FloatingButtons from "@/components/modules/main/home/components/FloatingButtons";
import FacilitiesSection from "@/components/modules/main/home/components/facilities/FacilitiesSection";
import GallerySection from "@/components/modules/main/home/components/gallery/GallerySection";
import GoogleMapSection from "@/components/modules/main/home/components/googleMap/GoogleMapSection";
import ContactUsForm from "@/components/modules/main/home/components/contactUsForm/ContactUsForm";
import AboutSection from "@/components/modules/main/home/components/about/AboutSection";

const HomeSection = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <GallerySection isFullGalleryButtonOff={true} imageItems={6} />
      <GoogleMapSection />
      <ContactUsForm />
      <FloatingButtons />
    </div>
  );
};

export default HomeSection;
