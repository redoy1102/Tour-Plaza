import { Routes, Route } from "react-router-dom";
import Home from "@/pages/main/HomePage";
import NotFound from "@/components/NotFound";

import RoomsVillasPage from "@/pages/main/roomsVillasPage/RoomsVillasPage";
import PackagesPage from "@/pages/main/packagesPage/PackagesPage";
import ExperiencesPage from "@/pages/main/experiencesPage/ExperiencesPage";
import ContactPage from "@/pages/main/contactPage/ContactPage";
import AboutPage from "@/pages/main/aboutPage/AboutPage";
import GalleryPage from "@/pages/main/galleryPage/GalleryPage";
import BookNowPage from "@/pages/main/bookNow/BookNowPage";
import Layout from "@/layouts/Layout";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="experiences" element={<ExperiencesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="book-now" element={<BookNowPage />} />
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
