
import { useResume } from "@/context/ResumeContext";

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="resume-page font-sans p-6 max-w-[800px] bg-white text-left">
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
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
                  <div>{exp.startDate} - {exp.endDate}</div>
                  <div>{exp.location}</div>
                </div>
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
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
                  <div>{edu.startDate} - {edu.endDate}</div>
                  <div>{edu.location}</div>
                </div>
              </div>
              {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="text-sm text-gray-700"
              >
                {skill.name}{skills[skills.length - 1].id !== skill.id ? "," : ""}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
