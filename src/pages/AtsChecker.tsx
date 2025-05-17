
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";

const AtsChecker = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResults, setCheckResults] = useState<null | {
    score: number;
    keywords: { matched: string[], missing: string[] };
    format: { issues: string[], tips: string[] };
  }>(null);

  // Mock ATS check function - in a real app, this would call an API
  const checkAtsCompatibility = () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description to check against");
      return;
    }

    setIsChecking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Basic validation of resume content
      const keywords = jobDescription.toLowerCase().split(/\s+/);
      const uniqueKeywords = [...new Set(keywords.filter(word => 
        word.length > 4 && !['and', 'with', 'from', 'that', 'have', 'this'].includes(word)
      ))];
      
      // Extract resume text content
      const resumeText = [
        resumeData.personalInfo.summary,
        ...resumeData.workExperience.map(exp => `${exp.position} ${exp.company} ${exp.description} ${exp.achievements.join(' ')}`),
        ...resumeData.education.map(edu => `${edu.degree} ${edu.field} ${edu.institution} ${edu.description}`),
        ...resumeData.skills.map(skill => skill.name)
      ].join(' ').toLowerCase();
      
      // Find matched and missing keywords
      const matched = uniqueKeywords.filter(word => resumeText.includes(word));
      const missing = uniqueKeywords.filter(word => !resumeText.includes(word) && word.length > 4);
      
      // Calculate score based on keyword matches
      const keywordScore = matched.length / Math.max(uniqueKeywords.length, 1) * 100;
      
      // Check format issues
      const formatIssues = [];
      
      if (!resumeData.personalInfo.email) formatIssues.push("Missing email contact information");
      if (!resumeData.personalInfo.phone) formatIssues.push("Missing phone contact information");
      if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 500) {
        formatIssues.push("Professional summary is too long (over 500 characters)");
      }
      if (resumeData.workExperience.length === 0) {
        formatIssues.push("No work experience listed");
      }
      if (resumeData.skills.length < 5) {
        formatIssues.push("Limited skills section (less than 5 skills)");
      }
      
      // Format tips
      const formatTips = [
        "Use standard section headings (Experience, Education, Skills)",
        "Avoid complex formatting or tables",
        "Use bullet points for achievements",
        "Include a skills section with relevant keywords",
        "Avoid images, charts, or graphics"
      ];
      
      // Overall score (keyword match + format)
      const formatScore = 100 - (formatIssues.length * 10);
      const overallScore = Math.round((keywordScore * 0.7) + (formatScore * 0.3));
      
      setCheckResults({
        score: overallScore,
        keywords: {
          matched: matched.slice(0, 10),
          missing: missing.slice(0, 10)
        },
        format: {
          issues: formatIssues,
          tips: formatTips
        }
      });
      
      setIsChecking(false);
    }, 1500);
  };
  
  const handleBack = () => {
    navigate("/preview");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ATS Compatibility Checker</h1>
        <p className="text-muted-foreground mt-2">
          Check how well your resume will perform with Applicant Tracking Systems
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compare Against Job Description</CardTitle>
          <p className="text-sm text-muted-foreground">
            Paste the job description to check how well your resume matches it
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to check compatibility..."
                rows={8}
                className="resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 flex justify-between p-4">
          <Button variant="outline" onClick={handleBack}>
            Back to Preview
          </Button>
          <Button 
            onClick={checkAtsCompatibility} 
            disabled={isChecking}
          >
            {isChecking ? "Checking..." : "Check Compatibility"}
          </Button>
        </CardFooter>
      </Card>
      
      {checkResults && (
        <div className="space-y-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>ATS Compatibility Score</span>
                <span className={`text-2xl ${getScoreColor(checkResults.score)}`}>
                  {checkResults.score}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={checkResults.score} 
                className="h-2"
                indicatorClassName={getProgressColor(checkResults.score)}
              />
              
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {checkResults.score >= 80 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : checkResults.score >= 60 ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <h3 className="font-medium">Keyword Match Analysis</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">Matched Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkResults.keywords.matched.length > 0 ? (
                          checkResults.keywords.matched.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No significant keyword matches found.</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2">Missing Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkResults.keywords.missing.length > 0 ? (
                          checkResults.keywords.missing.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-green-600">Great job! Your resume contains most of the important keywords.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Format & Structure Analysis</h3>
                  </div>
                  
                  {checkResults.format.issues.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-amber-600 mb-2">Potential Issues:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {checkResults.format.issues.map((issue, index) => (
                          <li key={index} className="text-muted-foreground">{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-primary mb-2">ATS-Friendly Tips:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {checkResults.format.tips.map((tip, index) => (
                        <li key={index} className="text-muted-foreground">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-between p-4">
              <Button variant="outline" onClick={handleBack}>
                Back to Preview
              </Button>
              <Button onClick={() => navigate("/builder")}>
                Edit Resume
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AtsChecker;
