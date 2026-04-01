import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/shared/Spinner";
import Home from "@/Pages/Home/Home";
import AboutPage from "@/Pages/AboutPage/AboutPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";
import NotFound from "@/components/NotFound";
import GalleryPage from "./Pages/GalleryPage/GalleryPage";
import ExperiencePage from "./Pages/ExperiencePage/ExperiencePage";
import OffersPage from "./Pages/SpecialOffersPage/OffersPage";
import RoomsVillasPage from "./Pages/RoomsVillasPage/RoomsVillasPage";

function App() {
  const [isAppReady] = useState(true);

  if (!isAppReady) return <Spinner />;

  return (
    <main className="bg-background">
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="experiences" element={<ExperiencePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="packages" element={<OffersPage />} />
            {/* <Route path="packages/:packageId" element={<OfferPage />} /> */}
            <Route path="rooms-villas" element={<RoomsVillasPage />} />
            {/* <Route path="rooms-villas/:roomId" element={<Room />} /> */}
            {/* <Route element={<StudentAuthGuard />}>
              <Route path="purchase/:courseId" element={<PurchasePage />} />
            </Route> */}
          </Route>

          {/* Student Routes (protected) */}
          <Route element={<StudentAuthGuard />}>
            {/* Admin Routes  */}
            {/* <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="enrollments" element={<Enrollments />} />
            </Route> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
