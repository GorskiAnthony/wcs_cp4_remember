import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        <Outlet />
      </div>
    </>
  );
}
