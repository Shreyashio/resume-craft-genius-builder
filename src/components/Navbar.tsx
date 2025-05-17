
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "font-medium text-primary" : "text-gray-600 hover:text-primary";
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <FileText className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-800">ResumeBuilder</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>
              Home
            </Link>
            <Link to="/builder" className={`${isActive('/builder')} transition-colors`}>
              Builder
            </Link>
            <Link to="/templates" className={`${isActive('/templates')} transition-colors`}>
              Templates
            </Link>
            <Link to="/ats-checker" className={`${isActive('/ats-checker')} transition-colors`}>
              ATS Checker
            </Link>
          </nav>
          
          <div>
            <Button asChild>
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
