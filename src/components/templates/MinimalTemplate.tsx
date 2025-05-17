
import { useResume } from "@/context/ResumeContext";

const MinimalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, workExperience, skills } = resumeData;

  return (
    <div className="resume-page font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-normal text-gray-900 tracking-wide">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="resume-section">
          <h2 className="text-base uppercase tracking-wide font-medium text-gray-900 mb-2">Profile</h2>
          <p className="text-gray-600">{personalInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section">
          <h2 className="text-base uppercase tracking-wide font-medium text-gray-900 mb-2">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-sm text-gray-500">{exp.startDate} — {exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
              {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
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
          <h2 className="text-base uppercase tracking-wide font-medium text-gray-900 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
              {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section">
          <h2 className="text-base uppercase tracking-wide font-medium text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}{index < skills.length - 1 ? " • " : ""}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
