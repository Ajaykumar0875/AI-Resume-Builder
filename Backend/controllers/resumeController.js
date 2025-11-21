

//controller for creating new resume 
//POST: api/resumes/create

import imageKit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from "fs";



export const createResume = async(req,res)=>{
    
    try{
        const userId = req.userId;

        const {title} = req.body;

        //create new resume 

        const newResume = await Resume.create({
            userId,
             title,
        });

        //return success message 
        return  res.status(201).json({message: "Resume created successfully", resume: newResume});

    }
    catch(error){
        return res.status(400).json({error: error.message});
    }
}


//contorller for deleting the resume
// DELETE: api/resumes/:id

export const deleteResume = async(req,res)=>{
    try{
        const userId = req.userId;
        const {resumeId} = req.params;


        await Resume.findOneAndDelete({userId,_id:resumeId});

        //return success message 
        return  res.status(200).json({message: "Resume deleted successfully"});

    }

    catch(error){
        return res.status(400).json({error: error.message});
    }
}



//get user resume by id 
// GET: api/resumes/get/:id


export const getResumeById = async(req,res)=>{
    try{
        const userId = req.userId;
        const {resumeId} = req.params;


        const resume = await Resume.findOne({userId,_id:resumeId});
        

        if(!resume){
            return res.status(404).json({error: 'Resume Not Found'});
        }

        resume.__v=undefined;
        resume.createdAt=undefined;
        resume.updatedAt=undefined;




        return res.status(200).json({resume});

    }

    catch(error){
        return res.status(400).json({error: error.message});
    }
}



// get resume by id public
// GET: api/resumes/public/:id 

export const getPublicResumeById = async(req,res)=>{

    try{
        const {resumeId} = req.params;  
        const resume =  await Resume.findOne({ _id: resumeId, public: true });


        
        if(!resume){
            return res.status(404).json({error: 'Resume Not Found'});
        }

        return res.status(200).json({resume});



    }

    catch(error){
        return res.status(400).json({error: error.message});

    }
}



//controller for updating a resume
// PUT: api/resumes/update


export const updateResume = async(req,res)=>{

    try{
        const userId = req.userId;
        const {resumeId,resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataCopy;


        if(typeof resumeData === 'string'){
            resumeDataCopy = JSON.parse(resumeData);
        }
        else{
            resumeDataCopy = structuredClone(resumeData);
        }

        if(image){
            try {
                console.log("Starting ImageKit upload...");
                const imageBufferData = fs.createReadStream(image.path);
                const response = await imageKit.files.upload({
                    file: imageBufferData,
                    fileName: 'resume.png',
                    folder:'user-resumes',
                    transformation:{
                        pre: "w-300,h-400,fo-auto,fo-face,z-0.75" + (removeBackground ? ",e-bgremove" : "") 
                    }
                });
                console.log("ImageKit upload success:", response.url);
                resumeDataCopy.personal_info.image = response.url + (removeBackground ? "?tr=e-bgremove" : "");
            } catch (imgError) {
                console.error("ImageKit Upload Error Details:", imgError);
                return res.status(400).json({
                    message: "Image processing failed: " + imgError.message
                });
            }
        }

        const resume = await Resume.findOneAndUpdate({userId, _id: resumeId}, { $set: resumeDataCopy }, {new: true});

        return res.status(200).json({message: "Saved Successfully", resume});


    }

    catch(error){
        return res.status(400).json({error: error.message});

    }
}



