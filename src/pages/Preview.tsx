
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { FileText, Download, Edit, Check } from "lucide-react";
import { toast } from "sonner";
import DownloadResumeDialog from "@/components/DownloadResumeDialog";

const Preview = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  
  const renderSelectedTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };
  
  const handleDownload = () => {
    // Show the download dialog instead of direct download
    setShowDownloadDialog(true);
  };
  
  const handleCheckATS = () => {
    navigate("/ats-checker");
  };
  
  const handleEdit = () => {
    navigate("/builder");
  };
  
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-8 items-start">
        <div>
          <h1 className="text-3xl font-bold">Resume Preview</h1>
          <p className="text-muted-foreground mt-2">
            Review your resume before downloading
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex gap-2" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button variant="outline" className="flex gap-2" onClick={handleCheckATS}>
            <Check className="h-4 w-4" />
            <span>Check ATS</span>
          </Button>
          <Button className="flex gap-2" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>
      
      <Card className="mb-8 p-6 bg-gray-50">
        <div className="flex justify-center">
          <div className="max-w-full overflow-auto shadow-lg" ref={resumeRef}>
            {renderSelectedTemplate()}
          </div>
        </div>
      </Card>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium text-lg mb-2">Check ATS Compatibility</h3>
            <p className="text-muted-foreground mb-4">
              Ensure your resume passes through Applicant Tracking Systems by checking its compatibility.
            </p>
            <Button variant="outline" onClick={handleCheckATS} className="w-full">
              Check ATS
            </Button>
          </Card>
          
          <Card className="p-6">
            <Download className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium text-lg mb-2">Download Your Resume</h3>
            <p className="text-muted-foreground mb-4">
              Get your resume in PDF format, ready to be sent to potential employers.
            </p>
            <Button onClick={handleDownload} className="w-full">
              Download PDF
            </Button>
          </Card>
          
          <Card className="p-6">
            <Edit className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium text-lg mb-2">Edit Your Resume</h3>
            <p className="text-muted-foreground mb-4">
              Go back to the editor to make changes to your information or try a different template.
            </p>
            <Button variant="outline" onClick={handleEdit} className="w-full">
              Edit Resume
            </Button>
          </Card>
        </div>
      </div>
      
      {/* Download Resume Dialog */}
      <DownloadResumeDialog 
        open={showDownloadDialog} 
        onOpenChange={setShowDownloadDialog}
        resumeName={`${resumeData.personalInfo?.fullName || 'Resume'}`}
      />
    </div>
  );
};

export default Preview;
