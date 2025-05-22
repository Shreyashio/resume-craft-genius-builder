
import { useResume } from "@/context/ResumeContext";

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="resume-page font-serif p-6 max-w-[800px] bg-white text-left">
      <div className="border-b-2 border-gray-700 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-center">{personalInfo.fullName}</h1>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-center mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">Work Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-1">
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
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-1">
                <p className="font-medium">{edu.degree} in {edu.field}</p>
                <span className="text-sm text-gray-600">{edu.location}</span>
              </div>
              {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">Skills</h2>
          <p className="text-sm">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}{index < skills.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
