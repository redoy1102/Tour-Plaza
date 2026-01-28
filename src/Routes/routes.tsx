import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutPage from "../Pages/AboutPage/AboutPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;
