
import { useResume } from "@/context/ResumeContext";

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="resume-page font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="resume-section">
          <h2 className="resume-section-title text-lg">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title text-lg">Work Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{exp.startDate} - {exp.endDate}</div>
                  <div>{exp.location}</div>
                </div>
              </div>
              {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm">
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
          <h2 className="resume-section-title text-lg">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{edu.startDate} - {edu.endDate}</div>
                  <div>{edu.location}</div>
                </div>
              </div>
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-title text-lg">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="px-2 py-1 bg-gray-100 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
