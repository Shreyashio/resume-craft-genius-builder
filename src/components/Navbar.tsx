
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <FileText className="h-6 w-6 text-primary mr-2 group-hover:animate-rotate-3d transition-transform duration-300" />
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
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-primary/10">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link to="/profile">My Profile</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link to="/my-resumes">My Resumes</Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button asChild variant="ghost" className="hover-lift">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
            <Button asChild className="shine-effect hover-lift hidden sm:flex">
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
