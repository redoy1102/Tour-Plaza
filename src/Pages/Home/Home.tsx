import HeroSection from "@/components/landingPage/Hero Section/HeroSection";
import StatsSection from "@/components/landingPage/Stats Section/StatsSection";
import AboutSection from "@/components/landingPage/About Section/AboutSection";
import AppSection from "@/components/landingPage/MobileAppSection/AppSection";
import WhyChooseSection from "@/components/landingPage/WhyChooseSection/WhyChooseSection";
import Courses from "@/components/landingPage/CoursesSection/CoursesSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <Courses />
      <WhyChooseSection />
      <AboutSection />
      <AppSection />
    </div>
  );
};

export default Home;
