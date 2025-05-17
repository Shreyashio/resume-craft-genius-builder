
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { Check } from "lucide-react";

const Templates = () => {
  const navigate = useNavigate();
  const { resumeData, setSelectedTemplate } = useResume();
  const [selectedTab, setSelectedTab] = useState(resumeData.selectedTemplate);
  
  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setSelectedTab(template);
  };
  
  const handleContinue = () => {
    navigate("/preview");
  };
  
  const handleBack = () => {
    navigate("/builder");
  };
  
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8 relative">
        <h1 className="text-3xl font-bold gradient-text">Choose a Template</h1>
        <p className="text-muted-foreground mt-2">
          Select a design that best suits your professional style
        </p>
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Modern Template Card */}
        <Card className={`overflow-hidden transition-all hover-lift card-3d ${selectedTab === 'modern' ? 'ring-2 ring-primary glow-effect' : ''}`}>
          <div className="aspect-[3/4] overflow-hidden border-b">
            <div className="transform scale-[0.38] origin-top-left h-[264%] w-[264%]">
              <ModernTemplate />
            </div>
          </div>
          <CardFooter className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Modern</h3>
              <p className="text-sm text-muted-foreground">Clean & contemporary</p>
            </div>
            <Button 
              variant={selectedTab === 'modern' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleTemplateSelect('modern')}
              className="min-w-[90px] hover-lift"
            >
              {selectedTab === 'modern' ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Selected
                </>
              ) : "Select"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Professional Template Card */}
        <Card className={`overflow-hidden transition-all hover-lift card-3d ${selectedTab === 'professional' ? 'ring-2 ring-primary glow-effect' : ''}`}>
          <div className="aspect-[3/4] overflow-hidden border-b">
            <div className="transform scale-[0.38] origin-top-left h-[264%] w-[264%]">
              <ProfessionalTemplate />
            </div>
          </div>
          <CardFooter className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Professional</h3>
              <p className="text-sm text-muted-foreground">Traditional & formal</p>
            </div>
            <Button 
              variant={selectedTab === 'professional' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleTemplateSelect('professional')}
              className="min-w-[90px] hover-lift"
            >
              {selectedTab === 'professional' ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Selected
                </>
              ) : "Select"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Minimal Template Card */}
        <Card className={`overflow-hidden transition-all hover-lift card-3d ${selectedTab === 'minimal' ? 'ring-2 ring-primary glow-effect' : ''}`}>
          <div className="aspect-[3/4] overflow-hidden border-b">
            <div className="transform scale-[0.38] origin-top-left h-[264%] w-[264%]">
              <MinimalTemplate />
            </div>
          </div>
          <CardFooter className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Minimal</h3>
              <p className="text-sm text-muted-foreground">Simple & elegant</p>
            </div>
            <Button 
              variant={selectedTab === 'minimal' ? "default" : "outline"} 
              size="sm"
              onClick={() => handleTemplateSelect('minimal')}
              className="min-w-[90px] hover-lift"
            >
              {selectedTab === 'minimal' ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Selected
                </>
              ) : "Select"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12">
        <Card className="glass-morphism">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 gradient-text">Preview</h2>
            <div className="border rounded-md overflow-hidden bg-white shadow-md">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="w-full border-b rounded-none bg-muted/50">
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="minimal">Minimal</TabsTrigger>
                </TabsList>
                
                <div className="p-6 flex justify-center overflow-auto max-h-[600px]">
                  <TabsContent value="modern" className="m-0 w-full" forceMount={selectedTab === "modern" ? true : undefined}>
                    <div className="transform scale-50 origin-top floating">
                      <ModernTemplate />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="professional" className="m-0 w-full" forceMount={selectedTab === "professional" ? true : undefined}>
                    <div className="transform scale-50 origin-top floating">
                      <ProfessionalTemplate />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="minimal" className="m-0 w-full" forceMount={selectedTab === "minimal" ? true : undefined}>
                    <div className="transform scale-50 origin-top floating">
                      <MinimalTemplate />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t bg-muted/50 flex justify-between">
            <Button variant="outline" onClick={handleBack} className="hover-lift">
              Back to Editor
            </Button>
            <Button onClick={handleContinue} className="hover-lift shine-effect">
              Continue to Preview
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Templates;
