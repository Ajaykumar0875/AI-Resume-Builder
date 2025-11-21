import { Linkedin, Globe } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year] = dateStr.split("-");
        return year;
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={14} />
                            <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm break-all underline">
                                {data.personal_info.linkedin}
                            </a>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} />
                            <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="text-sm break-all underline">
                                {data.personal_info.website}
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-8">
                    <h2 className="text-md font-semibold mb-4 uppercase" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-semibold mb-4 uppercase" style={{ color: accentColor }}>
                        EXPERIENCE
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-md font-semibold">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-sm mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                {exp.description && (
                                    <ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed space-y-1">
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

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section>
                    <h2 className="text-md mb-4 uppercase font-semibold" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex items-center mt-3">
                                    <h3 className="text-md font-medium text-zinc-800 flex-1">
                                        {project.name}
                                    </h3>
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
                                <p className="text-sm mb-1" style={{ color: accentColor }} >
                                    {project.type}
                                </p>
                                {project.description && (
                                    <ul className="list-disc list-inside text-sm text-zinc-700  space-y-1">
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

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-md uppercase mt-6 mb-4 font-medium" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600 text-sm" style={{ color: accentColor }}>{edu.institution}</p>
                                    {edu.gpa && edu.gpa !== "" && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-md uppercase mb-4 font-medium" style={{ color: accentColor }}>
                        SKILLS
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-semibold mt-4 mb-4 uppercase" style={{ color: accentColor }}>
                        CERTIFICATIONS
                    </h2>
                    <ul className="space-y-2">
                        {data.certifications.map((cert, idx) => (
                            <li key={idx} className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold text-gray-800">{cert.name}</span>
                                    <span className="text-gray-600 text-xs block" style={{ color: accentColor }}>{cert.issuer}</span>
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
}

export default MinimalTemplate;