import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import InstitutionsPage from "./pages/InstitutionsPage";
import CampusLifePage from "./pages/CampusLifePage";
import PlacementsPage from "./pages/PlacementsPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProgramPage from "./pages/ProgramPage";
import { programData } from "./data";

const titles = {
  "/": "Vishwachetana Vidyaniketana",
  "/about": "About Us",
  "/institutions": "Our Institutions",
  "/campus-life": "Campus Life",
  "/gallery": "Gallery",
  "/admin/login": "Admin login",
  "/admin/gallery": "Gallery administration",
  "/placements": "Placements",
  "/contact": "Contact Us",
};
function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = pathname.slice(1);
    document.title = `${titles[pathname] || programData[key]?.title || "Page"} | Vishwachetana Vidyaniketana`;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="institutions" element={<InstitutionsPage />} />
          <Route path="campus-life" element={<CampusLifePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin/gallery" element={<AdminGalleryPage />} />
          <Route path="placements" element={<PlacementsPage />} />
          <Route path="contact" element={<ContactPage />} />
          {Object.entries(programData).map(([path, data]) => (
            <Route
              key={path}
              path={path}
              element={<ProgramPage data={data} />}
            />
          ))}
          {Object.keys(programData).map((path) => (
            <Route
              key={`${path}.html`}
              path={`${path}.html`}
              element={<Navigate to={`/${path}`} replace />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
