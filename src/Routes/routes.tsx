import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutPage from "../Pages/AboutPage/AboutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default AppRoutes;
