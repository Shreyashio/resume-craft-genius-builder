
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { toast } from "sonner";

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;
  
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const [editMode, setEditMode] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updateEducation(editMode, formData);
      setEditMode(null);
      toast.success("Education updated");
    } else {
      addEducation(formData);
      toast.success("Education added");
    }
    
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
  };

  const handleEdit = (id: string) => {
    const educationToEdit = education.find(edu => edu.id === id);
    if (educationToEdit) {
      setFormData(educationToEdit);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setEditMode(null);
  };

  const handleDelete = (id: string) => {
    removeEducation(id);
    toast.success("Education removed");
    if (editMode === id) {
      handleCancel();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="University Name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Bachelor of Science"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              placeholder="Computer Science"
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
              placeholder="City, State"
            />
          </div>
          
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
            <Label htmlFor="endDate">End Date (or Expected)</Label>
            <Input
              id="endDate"
              name="endDate"
              type="month"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Relevant coursework, achievements, etc."
            rows={3}
          />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit">
            {editMode ? "Update Education" : "Add Education"}
          </Button>
          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Education Entries</h3>
        {education.length === 0 ? (
          <p className="text-sm text-muted-foreground">No education entries yet. Add your education details above.</p>
        ) : (
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id}>
                <CardHeader className="py-4 px-6 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">{edu.institution}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} in {edu.field}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                    onClick={() => handleDelete(edu.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="py-2 px-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                    {edu.location && <span className="text-sm">{edu.location}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  )}
                  <Button 
                    variant="link" 
                    className="px-0 py-1 h-auto" 
                    onClick={() => handleEdit(edu.id)}
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

export default EducationForm;
