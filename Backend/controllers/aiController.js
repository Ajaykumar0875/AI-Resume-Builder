//controller for enhancing a resueme's professional summary using AI
// POST: /api/ai/enhance-pro-sum

import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";
import multer from "multer";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');
const upload = multer();


export const enhanceProfessionalSummary = async(req,res) =>{

    try{
        const { userContent } =  req.body;
        console.log("AI Request - Model:", process.env.OPENAI_MODEL);
        console.log("AI Request - Content:", userContent);

        if(!userContent){
            return res.status(400).json({error: "Missing required fields"});
        }

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {"role": "system", "content": "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-3 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-friendly. Return only plain text without any markdown formatting (no **, *, •, or other special characters for formatting)."},
                {
                    "role": "user",
                    "content":userContent
                }
            ]
        })

        // Get the actual content string from the response
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });
    }


    catch(error){
            console.error("AI Enhance Error:", error);
            return res.status(400).json({message: error.message});

    }

}


//controller for enhancing the resume's job description using AI
// POST: api/ai/enhance-job-desc

export const enhanceJobDescription = async(req,res) =>{

    try{
        const { userContent } =  req.body;

        if(!userContent){
            return res.status(400).json({error: "Missing required fields"});
        }

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {"role": "system",
                 "content": "You are an expert in resume writing. Your task is to enhance the job description of the resume. The job description should be only in 1-3 sentences also highlighting the key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Return only plain text without any markdown formatting (no **, *, •, or other special characters for formatting)."
                },
                {
                    "role": "user",
                    "content":userContent
                }
            ]
        })

        // Get the actual content string from the response
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });
    }


    catch(error){
            console.error("AI Enhance Job Desc Error:", error);
            return res.status(400).json({message: error.message});

    }

}


//controller for enhancing the resume's project description using AI
// POST: api/ai/enhance-project-desc

export const enhanceProjectDescription = async(req,res) =>{

    try{
        const { userContent } =  req.body;

        if(!userContent){
            return res.status(400).json({error: "Missing required fields"});
        }

        const response = await ai.chat.completions.create({
            model:process.env.OPENAI_MODEL,
            messages:[
                {"role": "system",
                 "content": "You are an expert in resume writing. Your task is to enhance the project description of the resume. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Return only plain text without any markdown formatting (no **, *, •, or other special characters for formatting)."
                },
                {
                    "role": "user",
                    "content":userContent
                }
            ]
        })

        // Get the actual content string from the response
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });
    }


    catch(error){
            console.error("AI Enhance Project Desc Error:", error);
            return res.status(400).json({message: error.message});

    }

}


//controller for uploading the resume to the database
//Post: /api/ai/upload-resume


export const uploadResume = async(req,res) =>{
    try{
        // Debug logs to help diagnose upload issues
        console.log('req.file:', req.file);
        console.log('req.body.title:', req.body.title);
        console.log('req.userId:', req.userId);

        if (!req.body.title) {
            return res.status(400).json({ message: "Missing resume title." });
        }
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        let resumeText = req.body.resumeText;

        // If no text provided, try to parse from file
        if (!resumeText) {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded and no text provided. Please select a PDF resume." });
            }

            // Extract text from PDF
            let pdfData;
            try {
                const render_page = async (pageData) => {
                    // standard text extraction
                    let render_options = {
                        normalizeWhitespace: false,
                        disableCombineTextItems: false
                    }
                
                    let textContent = await pageData.getTextContent(render_options);
                    let lastY, text = '';
                    for (let item of textContent.items) {
                        if (lastY == item.transform[5] || !lastY){
                            text += item.str;
                        }
                        else{
                            text += '\n' + item.str;
                        }
                        lastY = item.transform[5];
                    }

                    // Extract links
                    try {
                        const annotations = await pageData.getAnnotations();
                        const links = annotations
                            .filter(a => a.subtype === 'Link' && a.url)
                            .map(a => a.url);
                        
                        if (links.length > 0) {
                            text += '\n\n[EXTRACTED LINKS]\n' + links.join('\n') + '\n[/EXTRACTED LINKS]';
                        }
                    } catch (e) {
                        console.warn("Failed to extract annotations from page:", e);
                    }

                    return text;
                }

                let options = {
                    pagerender: render_page
                };

                pdfData = await pdfParse(req.file.buffer, options);
            } catch (err) {
                console.error("PDF parsing error:", err);
                return res.status(400).json({ message: "Failed to parse PDF. Please upload a valid PDF file." });
            }
            resumeText = pdfData.text;
        }

        const systemPrompt = "You are an expert AI agent to extract data from resume.";
        const userPrompt = `Extract data from this resume: ${resumeText}
        
        IMPORTANT: The resume text may contain a section at the end called [EXTRACTED LINKS]. If this section exists, use these URLs to populate the 'link' fields in the 'projects', 'certifications', or 'personal_info' sections. Match the links to the corresponding items based on context (e.g., a GitHub link for a project, a LinkedIn profile link).
        
        Provide data in the following JSON format with no additional text before or after:
        {
            "personal_info": {
                "full_name": "",
                "profession": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": ""
            },
            "experience": [
                {
                    "company": "",
                    "position": "",
                    "start_date": "",
                    "end_date": "",
                    "description": "",
                    "is_current": false
                }
            ],
            "education": [
                {
                    "institution": "",
                    "degree": "",
                    "field": "",
                    "graduation_date": "",
                    "gpa": ""
                }
            ],
            "projects": [
                {
                    "name": "",
                    "description": "",
                    "link": ""
                }
            ],
            "skills": [],
            "certifications": [
                {
                    "name": "",
                    "issuer": "",
                    "link": ""
                }
            ],
            "professional_summary": ""
        }`;

        let response;
        try {
            response = await ai.chat.completions.create({
                model: process.env.OPENAI_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: { type: 'json_object' }
            });
        } catch (err) {
            console.error("AI extraction error:", err);
            return res.status(500).json({ message: "AI extraction failed. Please try again later." });
        }

        // Parse AI response
        let parsedData;
        try {
            parsedData = JSON.parse(response.choices[0].message.content);
        } catch (err) {
            console.error("AI response parsing error:", err);
            return res.status(500).json({ message: "Failed to parse AI response. Please try again." });
        }

        // Save resume to DB
        let newResume;
        try {
            console.log("Parsed Data from AI:", JSON.stringify(parsedData, null, 2));
            newResume = await Resume.create({ userId: req.userId, title: req.body.title, ...parsedData });
        } catch (err) {
            console.error("DB save error details:", err);
            return res.status(500).json({ message: "Failed to save resume. Please try again." });
        }

        res.json({ resumeId: newResume._id });
    } catch(error){
        console.error("General error:", error);
        return res.status(500).json({ message: error.message || "Unknown error occurred." });
    }
}


