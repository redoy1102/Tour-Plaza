import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layouts/Layout";
import Home from "@/Pages/main/HomePage";
import ContactPage from "@/components/modules/contact/ContactSection";
import NotFound from "@/components/NotFound";
import AboutSection from "@/components/modules/about/AboutSection";
import ExperiencesSection from "@/components/modules/experiences/ExperiencesSection";
import GallerySection from "@/components/modules/main/home/components/gallery/GallerySection";
import BookNowSection from "@/components/modules/bookNow/BookNowSection";
import RoomsVillasPage from "@/Pages/main/roomsVillasPage/RoomsVillasPage";
import PackagesPage from "@/Pages/main/packagesPage/PackagesPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutSection />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="experiences" element={<ExperiencesSection />} />
        <Route path="gallery" element={<GallerySection />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="book-now" element={<BookNowSection />} />
        {/* <Route path="packages/:packageId" element={<OfferPage />} /> */}
        <Route path="rooms-villas" element={<RoomsVillasPage />} />
        {/* <Route path="rooms-villas/:roomId" element={<Room />} /> */}
        {/* <Route element={<StudentAuthGuard />}>
          <Route path="purchase/:courseId" element={<PurchasePage />} />
        </Route> */}
      </Route>

      {/* Student Routes (protected) */}
      {/* <Route element={<StudentAuthGuard />}>
        Admin Routes
        <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="enrollments" element={<Enrollments />} />
        </Route>
      </Route> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
