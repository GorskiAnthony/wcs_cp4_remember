import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-10 h-[75vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
