import HeroSection from "./components/hero/HeroSection";
import AboutSection from "./components/about/AboutSection";
import FacilitiesSection from "./components/facilities/FacilitiesSection";
import GallerySection from "./components/gallery/GallerySection";
import GoogleMapSection from "./components/googleMap/GoogleMapSection";
import ContactUsForm from "./components/contactUsForm/ContactUsForm";
import FloatingButtons from "./components/FloatingButtons";


const HomeSection = () => {
  return (
    <div className="">
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
