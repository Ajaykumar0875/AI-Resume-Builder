import React, { useEffect, useState } from "react";
import { FilePenLineIcon, LoaderCircle, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from "lucide-react"
import {dummyResumeData} from '../assets/assets.js'
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import pdfToText from 'react-pdftotext';


const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth);

   const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

   const [allResumes, setAllResumes] = useState([]);
   const [showCreateResume, setShowCreateResume] = useState(false);
   const [showUploadResume, setshowUploadResume] = useState(false);
   const [title, setTitle] = useState("");
   const [resume, setResume] = useState(null);
   const [editResumeId, setEditResumeId] = useState('');
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [deleteResumeId, setDeleteResumeId] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   

   const navigate = useNavigate();



   const loadAllResumes = async () => {
      try{
        const {data} = await api.get(`/api/users/resumes`, {headers: {Authorization: token}})
        setAllResumes(data.resumes);
      }
      catch(error){
          toast.error(error?.response?.data?.message || error.message);
      }
   }

   const createResume = async(event)=>{
     try{
        const toastId = toast.loading('Resume creation in progress...', { style: { background: '#FEF3C7', color: '#92400E' } });
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
        event.preventDefault();
        const response = await api.post('/api/resumes/create', {title}, {headers: {Authorization: token}});
        console.log('API response for create:', response); // Debug log
        const createdResume = response.data.resume;
        setAllResumes([...allResumes, createdResume]);
        setTitle('');
        setShowCreateResume(false);
        if (createdResume && createdResume._id) {
          navigate(`/api/builder/${createdResume._id}`);
        } else {
          toast.error('Resume creation failed: No _id returned');
        }
      }
      catch(error){
        toast.error(error?.response?.data?.message || error.message);
      }
  }

  const editTitle = async(event) =>{
    try{
      event.preventDefault();
      const {data} = await api.put('/api/resumes/update', {
          resumeId: editResumeId, 
          resumeData: JSON.stringify({title})
      }, {headers: {Authorization: token}});
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
      setTitle('');
      setEditResumeId('');
      toast.success(data.message);
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message);
    }
  }

   const uploadResume = async(event)=>{
    event.preventDefault();
    if (!resume) {
      toast.error('Please select a PDF file');
      return;
    }
    setIsLoading(true);
    try{
       const resumeText = await pdfToText(resume);
       console.log("Frontend parsed text:", resumeText); // Debug log
       const {data} = await api.post('api/ai/upload-resume', {title, resumeText}, {headers:{Authorization: token}});
       setTitle('');
       setResume(null);
       setshowUploadResume(false);
       navigate(`/api/builder/${data.resumeId}`);

    }
    catch(error){
      console.error('Upload error details:', error);
      console.log('Upload error response:', error?.response?.data);
      toast.error(error?.response?.data?.message || error.message || "An unexpected error occurred");
    }
    setIsLoading(false);
   }

   const deleteResume = async() => {
    try{
          const {data} = await api.delete(`/api/resumes/delete/${deleteResumeId}`, {headers: {Authorization: token}});
          setAllResumes(allResumes.filter(resume => resume._id !== deleteResumeId));
          toast.success(data.message);
          setShowDeleteModal(false);
          setDeleteResumeId(null);
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteClick = (resumeId) => {
    setDeleteResumeId(resumeId);
    setShowDeleteModal(true);
  };
  
  const confirmDeleteResume = () => {
    deleteResume();
  };
  
  const cancelDeleteResume = () => {
    setShowDeleteModal(false);
    setDeleteResumeId(null);
  };

   useEffect(() => {
      loadAllResumes();
   }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8"> 
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from bg-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">Welcome, Tohru Honda</p>
         <div className="flex gap-4">
          <button onClick={()=>setShowCreateResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full"/>
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
          </button>

          <button onClick={()=>setshowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full"/>
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">Upload Existing</p>
          </button>
         </div>

         <hr className="border-slate-300 my-6 sm:w-[305px]"/>

          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume,index) =>{
                if (!resume || typeof resume !== 'object' || !resume._id) return null; // Defensive check
                const baseColor = colors[index%colors.length];
                return (
                  <button key={index} onClick={() => navigate(`/api/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-between rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{background: `linear-gradient(135deg, ${baseColor}1A, ${baseColor}40)`, borderColor: baseColor+'40'}}>
                    <div onClick={e=>e.stopPropagation()} className="absolute top-2 right-2 flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <TrashIcon onClick={()=>handleDeleteClick(resume._id)} className="size-6 p-1 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                        <PencilIcon onClick={()=>{setEditResumeId(resume._id);setTitle(resume.title)}} className="size-6 p-1 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 pt-6">
                      <FilePenLineIcon className="size-10 mb-2" style={{color: baseColor}}/>
                      <p className="text-base font-medium text-center" style={{color: baseColor}}>{resume.title || "Untitled"}</p>
                    </div>
                    <p className="absolute bottom-2 left-0 right-0 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center w-full" style={{color: baseColor+'90'}}>
                      {resume.updatedAt ? `Updated on ${new Date(resume.updatedAt).toLocaleDateString()}` : ""}
                    </p>
                  </button>
                )
            })}
          </div>

            {showCreateResume &&(
              <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className="fixed inset-0 bg-black/70b backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-mb rounded-lg w-full max-w-sm p-6">
                  <h2 className = "text-xl font-bold mb-4">Create a Resume</h2>
                   <input onChange={(e)=> setTitle(e.target.value)} value = {title} type="text" placeholder= "enter resume title" className="w-full px-4 py-2 mb-4 focus:border-orange-600 ring-orange-600" required/>

                   <button className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">Create Resume</button>
                   <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setShowCreateResume(false); setTitle('') }}/>
                </div>

              </form>         
            )
          }

          {
            showUploadResume && (
              <div className="fixed inset-0 bg-black/70b backdrop-blur bg-opacity-50 z-10 flex items-center justify-center" onClick={()=>setshowUploadResume(false)}>
                <form onSubmit={uploadResume} className="relative bg-slate-50 border shadow-mb rounded-lg w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
                  <h2 className = "text-xl font-bold mb-4">Upload Resume</h2>
                  <input onChange={(e)=> setTitle(e.target.value)} value = {title} type="text" placeholder= "enter resume title" className="w-full px-4 py-2 mb-4 focus:border-orange-600 ring-orange-600" required/>
                  <div>
                    <label htmlFor="resume-input" className="block text-sm text-slate-700">Select resume file
                      <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-orange-500 hover:text-orange-700 cursor-pointer transition-colors">
                        {resume ? (
                          <p className="text-orange-700">{resume.name}</p>
                        ) : (
                          <>
                            <UploadCloud className="size-14 stroke-1 "/>
                            <p>Upload Resume </p>
                          </>
                        )}
                      </div>
                    </label>
                    <input type="file" id= "resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])}/>
                  </div>
                  <button disabled= {isLoading} className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                    {isLoading && <LoaderCircle className="animate-spin size-4 text-white" />}
                    {isLoading ? "Uploading" : "Upload Resume"}
                    </button>
                  <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setshowUploadResume(false); setTitle('') }}/>
                </form>
              </div>
            )
          }
           {editResumeId &&(
              <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className="fixed inset-0 bg-black/70b backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-mb rounded-lg w-full max-w-sm p-6">
                  <h2 className = "text-xl font-bold mb-4">Edit Resume Title</h2>
                   <input onChange={(e)=> setTitle(e.target.value)} value = {title} type="text" placeholder= "enter resume title" className="w-full px-4 py-2 mb-4 focus:border-orange-600 ring-orange-600" required/>

                   <button className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">Update</button>
                   <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>{setEditResumeId(''); setTitle('') }}/>
                </div>

              </form>         
            )
          }

          {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-20 flex items-center justify-center" onClick={cancelDeleteResume}>
          <div onClick={e => e.stopPropagation()} className="relative bg-white border shadow-lg rounded-lg w-full max-w-sm p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Resume?</h2>
            <p className="mb-6 text-slate-600 text-center">Are you sure you want to delete this resume? This action cannot be undone.</p>
            <div className="flex gap-4 w-full">
              <button onClick={cancelDeleteResume} className="w-full py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">Cancel</button>
              <button onClick={confirmDeleteResume} className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Delete</button>
            </div>
            <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={cancelDeleteResume}/>
          </div>
        </div>
    )}
    </div>
  </div>
  )
}
export default Dashboard