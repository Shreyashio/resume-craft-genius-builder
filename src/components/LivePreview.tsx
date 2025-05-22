
import { useResume } from "@/context/ResumeContext";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";

const LivePreview = () => {
  const { resumeData } = useResume();
  
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

  return (
    <div className="border rounded-lg shadow-md bg-white">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50">
        <h3 className="text-sm font-medium">Live Preview</h3>
        <span className="text-xs text-muted-foreground">Updates as you type</span>
      </div>
      <div className="p-4 overflow-auto max-h-[450px]">
        <div className="transform scale-[0.65] origin-top-left h-[153.85%] w-[153.85%] shadow-sm">
          {renderSelectedTemplate()}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
