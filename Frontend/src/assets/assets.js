import dummy_profile from './dummy_profile.png'

// Add dummy resumes for all users
export const dummyResumeData = [
    {
        // ----------------------------------------------------- Resume 1 ------------------------------------------------------
        personal_info: {
            full_name: "Aizen Sosuke",
            email: "aizen@example.com",
            phone: "0 123456789",
            location: "NY, USA",
            linkedin: "https://www.linkedin.com",
            website: "https://www.example.com",
            profession: "Full Stack Developer",
            image: dummy_profile
        },
        _id: "68d2a31a1c4dd38875bb037e",
        userId: "68c180acdf1775dfd02c6d87",
        title: "Aizen's Resume",
        public: true,
        professional_summary: "Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools. ",
        skills: ["JavaScript", "React JS", "Full Stack Development", "Git", "GitHub", "NextJS", "Express", "NodeJS", "TypeScript"],
        experience: [
            {
                company: "Example Technologies.",
                position: "Senior Full Stack Developer",
                start_date: "2023-06",
                end_date: "Present",
                description: "Architected, developed, and deployed innovative full-stack applications at Example Technologies.\ncreating robust back-end systems and intuitive front- end interfaces to deliver meaningful digital experiences ",
                is_current: true,
                _id: "68d2a31a1c4dd38875bb037f"
            },
            {
                company: "Example Technologies.",
                position: "Full Stack Developer",
                start_date: "2019-08",
                end_date: "2023-05",
                description: "Engineered and deployed scalable full-stack web applications for Example Technologies, translating complex requirements into robust front-end interfaces and efficient back-end services.",
                is_current: false,
                _id: "68d4f7abc8f0d46dc8a8b114"
            }
        ],
        education: [
            {
                institution: "Example Institute of Technology",
                degree: "B.TECH",
                field: "CSE",
                graduation_date: "2023-05",
                gpa: "8.7",
                _id: "68d2a31a1c4dd38875bb0380"
            },
            {
                institution: "Example Public School",
                degree: "HIGHER SECONDARY",
                field: "PCM",
                graduation_date: "2019-03",
                gpa: "",
                _id: "68d2a31a1c4dd38875bb0381"
            },
            {
                institution: "Example Academy",
                degree: "SECONDARY SCHOOL",
                field: "",
                graduation_date: "2017-03",
                gpa: "",
                _id: "68d2a31a1c4dd38875bb0382"
            }
        ],
        template: "minimal-image",
        accent_color: "#14B8A6",
        project: [
            {
                name: "Team Task Management System",
                type: "Web Application (Productivity Tool)",
                description: "TaskTrackr is a collaborative task management system designed for teams to create, assign, track, and manage tasks in real time. ",
                _id: "68d4f882c8f0d46dc8a8b139",
                link: ""
            },
            {
                name: "EduHub - Online Learning Platform",
                type: "Web Application (EdTech Platform)",
                description: "EduHub is an online learning platform where instructors can create courses with video lessons, quizzes, and downloadable resources.",
                _id: "68d4f89dc8f0d46dc8a8b147",
                link: ""
            }
        ],
        certifications: [
            {
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2024-03-15",
                _id: "cert1"
            },
            {
                name: "Scrum Master Certified",
                issuer: "Scrum Alliance",
                date: "2023-11-10",
                _id: "cert2"
            }
        ],
        updatedAt: "2025-09-23T13:39:38.395Z",
        createdAt: "2025-09-23T13:39:38.395Z"
    },
    {
        // ----------------------------------------------------- Resume 2 ------------------------------------------------------
        personal_info: {
            full_name: "Killua",
            email: "killua@example.com",
            phone: "0 987654321",
            location: "San Francisco, CA, USA",
            linkedin: "https://www.linkedin.com/in/jordanlee",
            website: "https://www.jordanlee.dev",
            profession: "Frontend Engineer",
            image: dummy_profile
        },
        _id: "78e3b42c2d5ff49286cc148f",
        userId: "78d2e0bdcf2886efg03e7e98",
        title: "Killua's Resume",
        public: true,
        professional_summary: "Creative and detail-oriented Frontend Engineer with 5+ years of experience crafting responsive, user-centric web applications using React, Vue, and modern CSS frameworks.",
        skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "SASS", "Tailwind CSS", "Figma", "Web Accessibility", "REST APIs"],
        experience: [
            {
                company: "TechSpark Inc.",
                position: "Lead Frontend Engineer",
                start_date: "2022-02",
                end_date: "Present",
                description: "Leading a team of frontend developers to build accessible and scalable user interfaces. Collaborated with UX teams to implement design systems and improve frontend performance.",
                is_current: true,
                _id: "78e3b42c2d5ff49286cc1490"
            },
            {
                company: "PixelForge Labs",
                position: "Frontend Developer",
                start_date: "2018-09",
                end_date: "2022-01",
                description: "Developed reusable UI components using React and Vue.js. Worked closely with backend teams to integrate REST APIs and optimize SPA performance.",
                is_current: false,
                _id: "78e3b42c2d5ff49286cc1491"
            }
        ],
        education: [
            {
                institution: "University of Digital Arts",
                degree: "B.Sc.",
                field: "Computer Science",
                graduation_date: "2018-06",
                gpa: "3.8",
                _id: "78e3b42c2d5ff49286cc1492"
            },
            {
                institution: "Lincoln High School",
                degree: "High School Diploma",
                field: "Science",
                graduation_date: "2014-05",
                gpa: "",
                _id: "78e3b42c2d5ff49286cc1493"
            }
        ],
        template: "modern",
        accent_color: "#6366F1",
        project: [
            {
                name: "FitTrack - Fitness Dashboard",
                type: "Web Application (Health & Fitness)",
                description: "FitTrack is a fitness analytics dashboard that allows users to log workouts, track progress, and visualize performance through interactive charts.",
                _id: "78e3b42c2d5ff49286cc1494",
                link: ""
            },
            {
                name: "ShopEase - E-commerce UI Kit",
                type: "Frontend UI Kit",
                description: "ShopEase is a modular e-commerce frontend template with ready-to-use components for product listing, cart management, and responsive navigation.",
                _id: "78e3b42c2d5ff49286cc1495",
                link: ""
            }
        ],
        certifications: [
            {
                name: "Google UX Design Professional Certificate",
                issuer: "Google",
                date: "2022-08-20",
                _id: "cert3"
            }
        ],
        updatedAt: "2025-09-25T15:10:21.184Z",
        createdAt: "2025-09-25T15:10:21.184Z"
    },
    {
        // ----------------------------------------------------- Resume 3 ------------------------------------------------------
        personal_info: {
            full_name: "Itachi Uchiha",
            email: "itachi.uchiha@example.com",
            phone: "0 1122334455",
            location: "Austin, TX, USA",
            linkedin: "https://www.linkedin.com/in/rileymorgan",
            website: "https://www.rileym.dev",
            profession: "Backend Developer",
            image: dummy_profile
        },
        _id: "89f4c53d3e6gg59397dd259g",
        userId: "89e3f1cedg3997fgh14f8f09",
        title: "Itachi's Resume",
        public: true,
        professional_summary: "Dedicated Backend Developer with 7+ years of experience building secure, high-performance APIs and microservices using Node.js, Python, and PostgreSQL. Passionate about scalability, automation, and clean architecture.",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "CI/CD", "Redis", "GraphQL", "AWS"],
        experience: [
            {
                company: "DataNest Solutions",
                position: "Senior Backend Engineer",
                start_date: "2021-03",
                end_date: "Present",
                description: "Developed distributed microservices using Node.js and Docker. Implemented API rate limiting, authentication, and background job processing using Redis and Bull.",
                is_current: true,
                _id: "89f4c53d3e6gg59397dd259h"
            },
            {
                company: "CloudCore Systems",
                position: "Backend Developer",
                start_date: "2016-07",
                end_date: "2021-02",
                description: "Maintained and scaled backend systems built on Python and PostgreSQL. Automated deployments with GitLab CI/CD and improved API response time by 35%.",
                is_current: false,
                _id: "89f4c53d3e6gg59397dd259i"
            }
        ],
        education: [
            {
                institution: "Texas Institute of Technology",
                degree: "B.E.",
                field: "Information Technology",
                graduation_date: "2016-05",
                gpa: "3.9",
                _id: "89f4c53d3e6gg59397dd259j"
            },
            {
                institution: "Central High School",
                degree: "High School Diploma",
                field: "Science",
                graduation_date: "2012-04",
                gpa: "",
                _id: "89f4c53d3e6gg59397dd259k"
            }
        ],
        template: "classic",
        accent_color: "#F59E0B",
        project: [
            {
                name: "Invoicr - Invoice Management System",
                type: "Web Application (FinTech)",
                description: "Invoicr is a secure web platform that allows freelancers and small businesses to generate, track, and automate professional invoices. Built with Node.js, MongoDB, and Stripe integration.",
                _id: "89f4c53d3e6gg59397dd259l",
                link: ""
            },
            {
                name: "API Monitor Dashboard",
                type: "DevOps Tool",
                description: "A real-time API monitoring dashboard for microservices. Tracks latency, uptime, and error rates using Prometheus and Grafana.",
                _id: "89f4c53d3e6gg59397dd259m",
                link: ""
            }
        ],
        certifications: [
            {
                name: "Certified Kubernetes Administrator",
                issuer: "Cloud Native Computing Foundation",
                date: "2025-01-05",
                _id: "cert4"
            }
        ],
        updatedAt: "2025-09-25T15:26:49.652Z",
        createdAt: "2025-09-25T15:26:49.652Z"
    },
    {
        // ----------------------------------------------------- Resume 4 ------------------------------------------------------
        personal_info: {
            full_name: "Zoro Roronoa",
            email: "zoro@example.com",
            phone: "0 555666777",
            location: "Kyoto, Japan",
            linkedin: "https://www.linkedin.com/in/zorororonoa",
            website: "https://www.zoroswords.dev",
            profession: "DevOps Engineer",
            image: dummy_profile
        },
        _id: "90a5d64e4f7hh60408ee360n",
        userId: "90a5d64e4f7hh60408ee360o",
        title: "Zoro's Resume",
        public: true,
        professional_summary: "Resourceful DevOps Engineer with 4+ years of experience automating deployments, managing CI/CD pipelines, and optimizing cloud infrastructure for high availability.",
        skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD", "Jenkins", "Python", "Monitoring", "Ansible"],
        experience: [
            {
                company: "CloudSamurai",
                position: "DevOps Engineer",
                start_date: "2021-01",
                end_date: "Present",
                description: "Automated infrastructure provisioning and deployment using Terraform and Jenkins. Improved system reliability and reduced deployment times by 40%.",
                is_current: true,
                _id: "90a5d64e4f7hh60408ee360p"
            },
            {
                company: "BladeTech",
                position: "Systems Engineer",
                start_date: "2018-06",
                end_date: "2020-12",
                description: "Managed Linux servers and implemented monitoring solutions. Assisted in cloud migration projects and security audits.",
                is_current: false,
                _id: "90a5d64e4f7hh60408ee360q"
            }
        ],
        education: [
            {
                institution: "Kyoto Institute of Technology",
                degree: "B.Eng.",
                field: "Information Systems",
                graduation_date: "2018-03",
                gpa: "3.7",
                _id: "90a5d64e4f7hh60408ee360r"
            }
        ],
        template: "minimal",
        accent_color: "#22C55E",
        project: [
            {
                name: "InfraGuard",
                type: "Infrastructure Automation Tool",
                description: "InfraGuard is a CLI tool for automating cloud resource provisioning and monitoring, supporting AWS and Azure.",
                _id: "90a5d64e4f7hh60408ee360s",
                link: ""
            }
        ],
        certifications: [
            {
                name: "AWS Certified DevOps Engineer",
                issuer: "Amazon Web Services",
                date: "2023-09-10",
                _id: "cert5"
            }
        ],
        updatedAt: "2025-10-19T10:00:00.000Z",
        createdAt: "2025-10-19T10:00:00.000Z"
    },
    {
        // ----------------------------------------------------- Resume 5 ------------------------------------------------------
        personal_info: {
            full_name: "Kazuha Kaedehara",
            email: "kazuha@example.com",
            phone: "0 888999000",
            location: "Osaka, Japan",
            linkedin: "https://www.linkedin.com/in/kazuhakaedehara",
            website: "https://www.kazuhacode.com",
            profession: "UI/UX Designer",
            image: dummy_profile
        },
        _id: "91b6e75f5g8ii71519ff471p",
        userId: "91b6e75f5g8ii71519ff471q",
        title: "Kazuha's Resume",
        public: true,
        professional_summary: "Innovative UI/UX Designer with 3+ years of experience creating intuitive, user-friendly interfaces for web and mobile applications. Skilled in Figma, prototyping, and user research.",
        skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Wireframing", "Prototyping", "User Testing", "HTML/CSS", "Mobile Design", "Accessibility"],
        experience: [
            {
                company: "DesignWinds Studio",
                position: "UI/UX Designer",
                start_date: "2022-04",
                end_date: "Present",
                description: "Designed and prototyped web/mobile interfaces for SaaS clients. Conducted user research and usability testing to refine product flows.",
                is_current: true,
                _id: "91b6e75f5g8ii71519ff471r"
            },
            {
                company: "PixelBreeze",
                position: "Junior Designer",
                start_date: "2020-01",
                end_date: "2022-03",
                description: "Assisted in creating wireframes and mockups for e-commerce and portfolio websites. Collaborated with developers to ensure design consistency.",
                is_current: false,
                _id: "91b6e75f5g8ii71519ff471s"
            }
        ],
        education: [
            {
                institution: "Osaka University of Arts",
                degree: "B.A.",
                field: "Design",
                graduation_date: "2019-07",
                gpa: "3.9",
                _id: "91b6e75f5g8ii71519ff471t"
            }
        ],
        template: "latest",
        accent_color: "#F43F5E",
        project: [
            {
                name: "FlowMap UI Kit",
                type: "UI Kit",
                description: "A modern UI kit for dashboards and analytics apps, featuring reusable components and dark mode support.",
                _id: "91b6e75f5g8ii71519ff471u",
                link: ""
            }
        ],
        certifications: [
            {
                name: "Certified UX Professional",
                issuer: "Interaction Design Foundation",
                date: "2024-06-18",
                _id: "cert6"
            }
        ],
        updatedAt: "2025-10-19T10:00:00.000Z",
        createdAt: "2025-10-19T10:00:00.000Z"
    },
    {
        _id: '1',
        userId: 'user1',
        title: 'Frontend Developer Resume',
        updatedAt: '2025-11-01',
    },
    {
        _id: '2',
        userId: 'user2',
        title: 'Backend Developer Resume',
        updatedAt: '2025-11-02',
    },
    {
        _id: '3',
        userId: 'user3',
        title: 'Full Stack Resume',
        updatedAt: '2025-11-03',
    },
    // Add more dummy resumes as needed
]