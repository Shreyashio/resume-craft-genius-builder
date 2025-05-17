
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? "font-medium text-primary" : "text-gray-600 hover:text-primary";
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <FileText className="h-6 w-6 text-primary mr-2 group-hover:rotate-3d transition-transform duration-300" />
            <span className="text-xl font-bold text-gray-800 gradient-text">ResumeBuilder</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors hover-lift inline-block`}>
              Home
            </Link>
            <Link to="/builder" className={`${isActive('/builder')} transition-colors hover-lift inline-block`}>
              Builder
            </Link>
            <Link to="/templates" className={`${isActive('/templates')} transition-colors hover-lift inline-block`}>
              Templates
            </Link>
            <Link to="/ats-checker" className={`${isActive('/ats-checker')} transition-colors hover-lift inline-block`}>
              ATS Checker
            </Link>
          </nav>
          
          <div>
            <Button asChild className="shine-effect hover-lift">
              <Link to="/builder">
                Create Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
