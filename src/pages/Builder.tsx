
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import EducationForm from "@/components/EducationForm";
import WorkExperienceForm from "@/components/WorkExperienceForm";
import SkillsForm from "@/components/SkillsForm";
import { useResume } from "@/context/ResumeContext";
import { toast } from "sonner";

const Builder = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const handleNext = () => {
    switch (activeTab) {
      case "personal":
        setActiveTab("education");
        break;
      case "education":
        setActiveTab("experience");
        break;
      case "experience":
        setActiveTab("skills");
        break;
      case "skills":
        navigate("/templates");
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (activeTab) {
      case "education":
        setActiveTab("personal");
        break;
      case "experience":
        setActiveTab("education");
        break;
      case "skills":
        setActiveTab("experience");
        break;
      default:
        break;
    }
  };

  const validateCurrentTab = () => {
    switch (activeTab) {
      case "personal":
        if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
          toast.error("Please fill in required personal information");
          return false;
        }
        break;
      case "skills":
        if (resumeData.skills.length === 0) {
          toast.error("Please add at least one skill");
          return false;
        }
        break;
    }
    return true;
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNextWithValidation = () => {
    if (validateCurrentTab()) {
      handleNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <p className="text-muted-foreground mt-2">
          Fill in your information to create a professional resume
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoForm />
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <EducationForm />
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <WorkExperienceForm />
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <SkillsForm />
            </TabsContent>

            <div className="flex justify-between mt-8">
              {activeTab !== "personal" && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                <Button onClick={handleNextWithValidation}>
                  {activeTab === "skills" ? "Choose Template" : "Next"}
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Builder;
