
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const WorkExperienceForm = () => {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResume();
  const { workExperience } = resumeData;
  
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    achievements: [""],
  });

  const [editMode, setEditMode] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    setFormData(prev => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = value;
      return { ...prev, achievements: newAchievements };
    });
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => {
      const newAchievements = [...prev.achievements];
      newAchievements.splice(index, 1);
      return { ...prev, achievements: newAchievements };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredAchievements = formData.achievements.filter(a => a.trim() !== "");
    const dataToSubmit = {
      ...formData,
      achievements: filteredAchievements,
    };
    
    if (editMode) {
      updateWorkExperience(editMode, dataToSubmit);
      setEditMode(null);
      toast.success("Work experience updated");
    } else {
      addWorkExperience(dataToSubmit);
      toast.success("Work experience added");
    }
    
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [""],
    });
  };

  const handleEdit = (id: string) => {
    const experienceToEdit = workExperience.find(exp => exp.id === id);
    if (experienceToEdit) {
      // Ensure there's at least one empty field for new achievements
      const achievements = experienceToEdit.achievements.length ? 
        experienceToEdit.achievements : [""];
      
      setFormData({
        ...experienceToEdit,
        achievements,
      });
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [""],
    });
    setEditMode(null);
  };

  const handleDelete = (id: string) => {
    removeWorkExperience(id);
    toast.success("Work experience removed");
    if (editMode === id) {
      handleCancel();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State or Remote"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (or Present)</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="Present"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your role and responsibilities"
            rows={3}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Key Achievements</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addAchievement}
              className="h-8 px-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Achievement
            </Button>
          </div>
          
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                placeholder={`Achievement ${index + 1}`}
              />
              {formData.achievements.length > 1 && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeAchievement(index)}
                  className="h-10 w-10 text-muted-foreground hover:text-destructive"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button type="submit">
            {editMode ? "Update Experience" : "Add Experience"}
          </Button>
          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Work Experience</h3>
        {workExperience.length === 0 ? (
          <p className="text-sm text-muted-foreground">No work experience entries yet. Add your work history above.</p>
        ) : (
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <Card key={exp.id}>
                <CardHeader className="py-4 px-6 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{exp.position}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}{exp.location ? ` • ${exp.location}` : ""}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                    onClick={() => handleDelete(exp.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="py-2 px-6">
                  <div className="mb-2">
                    <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className="text-sm mb-2">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium">Key Achievements:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button 
                    variant="link" 
                    className="px-0 py-1 h-auto" 
                    onClick={() => handleEdit(exp.id)}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperienceForm;
