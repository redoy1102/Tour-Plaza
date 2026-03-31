import HeroSection from "@/components/landingPage/Hero Section/HeroSection";
import FloatingButtons from "@/components/shared/FloatingButtons";
import AboutExperience from "@/components/AboutExperience/AboutExperience";
import FacilitiesSection from "@/features/facilities/FacilitiesSection";
import GallerySection from "@/features/gallery/GallerySection";
import GoogleMapSection from "@/features/googleMap/GoogleMapSection";
import ContactUsForm from "@/features/contactUsForm/ContactUsForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutExperience />
      <FacilitiesSection />
      <GallerySection />
      <GoogleMapSection />
      <ContactUsForm />
      <FloatingButtons />
    </div>
  );
};

export default Home;
