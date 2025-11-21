import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year] = dateStr.split("-");
		return year;
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.website && (
						<div className="flex items-center gap-2">
							<Globe size={14} style={{ color: 'white' }} />
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
							<Linkedin size={14} style={{ color: 'white' }} />
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

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-8">
						<h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
							PROFESSIONAL SUMMARY
						</h2>
						<p className="text-sm text-gray-700">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
							EXPERIENCE
						</h2>

						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative">

									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-md font-semibold text-gray-900">{exp.position}</h3>
											<p className="text-sm" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 px-3 py-1 rounded">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </div>
									</div>
									{exp.description && (
										<ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed mt-2 space-y-1">
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
						<h2 className="text-md uppercase font-semibold" style={{ color: accentColor }}>
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

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="mt-8">
							<h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
								EDUCATION
							</h2>

							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p className="text-sm" style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-sm text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && edu.gpa !== "" && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="mt-8">
							<h2 className="text-md font-medium mb-4 uppercase" style={{ color: accentColor }}>
								SKILLS
							</h2>

							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm text-white rounded-full"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Certifications */}
				{data.certifications && data.certifications.length > 0 && (
					<section className="mb-6 mt-8">
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
		</div>
	);
}

export default ModernTemplate;