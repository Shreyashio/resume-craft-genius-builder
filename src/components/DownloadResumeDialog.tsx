
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { toast } from "sonner";

interface DownloadResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeName?: string;
}

const DownloadResumeDialog = ({ open, onOpenChange, resumeName = "Resume" }: DownloadResumeDialogProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleDownload = () => {
    if (isLoggedIn) {
      // In a real app, this would trigger the actual download
      toast.success("Your resume is being downloaded!");
      onOpenChange(false);
    } else {
      setShowLogin(true);
    }
  };
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    toast.success("Your resume is being downloaded!");
    onOpenChange(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md glass-card border-primary/10">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary/10 p-3 rounded-full backdrop-blur-lg border border-white/20 shadow-3d">
            <FileText className="h-8 w-8 text-primary animate-floating" />
          </div>
          
          <DialogHeader className="pt-8 text-center">
            <DialogTitle className="text-2xl font-bold gradient-text">Download Your Resume</DialogTitle>
            <DialogDescription>
              {resumeName} is ready for download! Get your professional PDF now.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center my-4">
            <div className="w-32 h-40 bg-white shadow-md rounded-md flex items-center justify-center border transform hover:rotate-2 transition-all">
              <div className="text-center">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <p className="text-xs mt-2 font-medium">{resumeName}.pdf</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              className="w-full sm:w-auto shine-effect hover-lift flex gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <LoginModal 
        open={showLogin} 
        onOpenChange={setShowLogin} 
        onSuccess={handleLoginSuccess} 
      />
    </>
  );
};

export default DownloadResumeDialog;
