import React from "react";
import { Globe, Linkedin } from "lucide-react";

const LatestTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year] = dateStr.split("-");
    return year;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white text-black p-8 font-sans border border-gray-300" style={{ fontSize: '15px' }}>
      {/* Name & Contact */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold tracking-wide text-black">{data.personal_info?.full_name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {data.personal_info.website}
              </a>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} />
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {data.personal_info.linkedin}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4 uppercase" style={{ color: accentColor }}>Professional Summary</h2>
          <p className="text-sm  text-gray-800 leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4 uppercase" style={{ color: accentColor }}>Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center">
                  <span className="text-md text-black text-lg">{exp.position}</span>
                  <span className="text-sm text-gray-600" >{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                </div>
                <span className="text-gray-700 text-sm" style={{ color: accentColor }}>{exp.company}</span>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm text-gray-800 leading-relaxed mt-1 space-y-1">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-4 uppercase" style={{ color: accentColor }}>Education</h2>
          <div className="space-y-2">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-black">{edu.degree}</span>{' '}
                  <span className="text-gray-700 text-sm" style={{ color: accentColor }}>{edu.institution}</span>
                  {edu.gpa && edu.gpa !== "" && (
                    <span className="text-xs text-gray-500 ml-2">GPA: {edu.gpa}</span>
                  )}
                </div>
                <span className="text-xs text-gray-600">{formatDate(edu.graduation_date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-4 uppercase" style={{ color: accentColor }}>Projects</h2>
          <div className="space-y-2">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-black">{project.name}</span>
                  {project.link && (
                    <a
                      href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Link to repo
                    </a>
                  )}
                </div>
                <span className="text-gray-700 text-sm" style={{ color: accentColor }}>{project.type}</span>
                {project.description && (
                  <ul className="list-disc list-inside text-gray-800 text-sm mt-1">
                    {project.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-4 uppercase" style={{ color: accentColor }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs text-black">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-3 mt-4 uppercase" style={{ color: accentColor }}>Certifications</h2>
          <ul className="space-y-1">
            {data.certifications.map((cert, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-black">{cert.name}</span>
                  <span className="text-gray-700 text-xs block" style={{ color: accentColor }}>{cert.issuer}</span>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default LatestTemplate;
