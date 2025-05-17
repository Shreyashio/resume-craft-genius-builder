
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: string[];
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  selectedTemplate: string;
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setSelectedTemplate: (template: string) => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  education: [],
  workExperience: [],
  skills: [],
  selectedTemplate: 'modern',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...education,
      id: Date.now().toString(),
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, ...education } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  };

  const addWorkExperience = (experience: Omit<WorkExperience, 'id'>) => {
    const newExperience: WorkExperience = {
      ...experience,
      id: Date.now().toString(),
    };
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };

  const updateWorkExperience = (id: string, experience: Partial<WorkExperience>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(item => 
        item.id === id ? { ...item, ...experience } : item
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(item => item.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item => 
        item.id === id ? { ...item, ...skill } : item
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id),
    }));
  };

  const setSelectedTemplate = (template: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: template,
    }));
  };

  const value: ResumeContextType = {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill,
    setSelectedTemplate,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
