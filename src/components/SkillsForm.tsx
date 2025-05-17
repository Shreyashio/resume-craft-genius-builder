
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SkillsForm = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;
  
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillName.trim()) {
      toast.error("Please enter a skill name");
      return;
    }
    
    if (editMode) {
      updateSkill(editMode, { name: skillName, level: skillLevel });
      setEditMode(null);
      toast.success("Skill updated");
    } else {
      addSkill({ name: skillName, level: skillLevel });
      toast.success("Skill added");
    }
    
    setSkillName("");
    setSkillLevel(3);
  };

  const handleEdit = (id: string) => {
    const skillToEdit = skills.find(skill => skill.id === id);
    if (skillToEdit) {
      setSkillName(skillToEdit.name);
      setSkillLevel(skillToEdit.level);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    setSkillName("");
    setSkillLevel(3);
    setEditMode(null);
  };

  const handleDelete = (id: string) => {
    removeSkill(id);
    toast.success("Skill removed");
    if (editMode === id) {
      handleCancel();
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Intermediate";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-blue-100 text-blue-800";
      case 2: return "bg-blue-200 text-blue-800";
      case 3: return "bg-blue-300 text-blue-800";
      case 4: return "bg-blue-400 text-blue-800";
      case 5: return "bg-blue-500 text-white";
      default: return "bg-blue-300 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., JavaScript, Project Management, etc."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skillLevel">
              Proficiency Level: <span className="font-medium">{getLevelLabel(skillLevel)}</span>
            </Label>
            <Slider
              id="skillLevel"
              value={[skillLevel]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => setSkillLevel(value[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit">
            {editMode ? "Update Skill" : "Add Skill"}
          </Button>
          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet. Add your skills above.</p>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="py-2 px-3 flex items-center gap-2 text-base rounded-lg border"
                  >
                    <span>{skill.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(skill.level)}`}>
                      {getLevelLabel(skill.level)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1 p-0 rounded-full hover:bg-gray-200"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 ml-1 py-0 px-1 text-xs"
                      onClick={() => handleEdit(skill.id)}
                    >
                      Edit
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
