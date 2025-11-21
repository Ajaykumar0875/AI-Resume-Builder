import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year] = dateStr.split("-");
        return year;
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
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
                    <h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
                        EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 text-sm " style={{ color: accentColor }}>{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
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
                    <h2 className="text-md font-medium uppercase  mb-4" style={{ color: accentColor }}>
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
                <section className="mb-6">
                    <h2 className="text-md font-medium mb-4 mt-8 uppercase" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-sm" style={{ color: accentColor }}>{edu.institution}</p>
                                    {edu.gpa && edu.gpa !== "" && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
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

export default ClassicTemplate;