
import { useResume } from "@/context/ResumeContext";

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="resume-page font-serif">
      <div className="border-b-4 border-blue-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">{personalInfo.fullName}</h1>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-center mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="resume-section">
          <h2 className="text-lg font-bold text-blue-800 uppercase mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section">
          <h2 className="text-lg font-bold text-blue-800 uppercase mb-2">Work Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <p className="font-medium">{exp.company}</p>
                <span className="text-sm text-gray-600">{exp.location}</span>
              </div>
              {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-outside ml-5 mt-2 text-sm">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="text-lg font-bold text-blue-800 uppercase mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <p className="font-medium">{edu.degree} in {edu.field}</p>
                <span className="text-sm text-gray-600">{edu.location}</span>
              </div>
              {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="text-lg font-bold text-blue-800 uppercase mb-2">Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="font-medium mr-2">{skill.name}</span>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                  <div 
                    className="h-1.5 bg-blue-600 rounded-full" 
                    style={{ width: `${skill.level * 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
