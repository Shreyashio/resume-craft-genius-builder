
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ResumeProvider } from "@/context/ResumeContext";

const Layout = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ResumeBuilder Pro | Build professional resumes with ease
          </div>
        </footer>
      </div>
    </ResumeProvider>
  );
};

export default Layout;
