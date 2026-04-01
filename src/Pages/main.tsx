import HeroSection from "@/components/modules/home/Hero Section/HeroSection";
import FloatingButtons from "@/components/shared/buttons/FloatingButtons";
import FacilitiesSection from "@/components/modules/home/facilities/FacilitiesSection";
import GallerySection from "@/components/modules/home/gallery/GallerySection";
import GoogleMapSection from "@/components/modules/home/googleMap/GoogleMapSection";
import ContactUsForm from "@/components/modules/home/contactUsForm/ContactUsForm";
import AboutSection from "@/components/modules/home/AboutExperience/AboutExperience";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FacilitiesSection />
      <GallerySection
        isFullGalleryButtonOff={true}
        imageItems={6}
      />
      <GoogleMapSection />
      <ContactUsForm />
      <FloatingButtons />
    </div>
  );
};

export default Home;
