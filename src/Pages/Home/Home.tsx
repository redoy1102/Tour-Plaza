import HeroSection from "@/components/landingPage/Hero Section/HeroSection";
import MainNavbar from "../../components/landingPage/Header/MainNavbar";
import TopBar from "../../components/landingPage/Header/TopBar";
import StatsSection from "@/components/landingPage/Stats Section/StatsSection";
import AboutSection from "@/components/landingPage/About Section/AboutSection";
import AppSection from "@/components/MobileAppSection/AppSection";

const Home = () => {
    return (
        <div>
            {/* Header */}
            <TopBar />
            <MainNavbar />
            <HeroSection />
            <StatsSection />
            <AboutSection />
            <AppSection />
        </div>
    );
};

export default Home;