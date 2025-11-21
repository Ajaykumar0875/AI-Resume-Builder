import api from '../configs/api';
import { Plus, Sparkle, Trash2Icon, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';

const ProjectForm = ({data = [], onChange}) => {

    const {token} = useSelector((state)=>state.auth);
    const [generatingIndex, setGeneratingIndex] = useState(-1);

    const addProject = ()=>{
    const newProject ={
        name:"",
        type:"",
        description:"",
        link:"",
    };  

    onChange([...data, newProject]);
  }


  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index,field,value) => {
    const updated = [...data];
    updated[index] = {...updated[index],[field]: value};
    onChange(updated);
  };

  const generateDescription = async(index)=>{
    setGeneratingIndex(index);
    const project = data[index];
    const prompt = `enhance this project description for ${project.description} for the project ${project.name}. The technologies used are ${project.type || 'not specified'}.`;

    try{
        const {data} = await api.post("/api/ai/enhance-project-desc",{userContent: prompt},{
            headers:{
                Authorization: token
            }
        })
        updateProject(index,"description",data.enhancedContent);
    }
    catch(error){
        toast.error(error.message);
    }    
    finally{
        setGeneratingIndex(-1);
    }
  }

  return (
    <div>
        <div className='flex items-center justify-between'>
            <div>
                <h3>Projects</h3>
                <p className='text-sm text-gray-500'>Add your Projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700
            rounded-lg hover:bg-orange-200 transition-colors'>
                <Plus className='size-4' />
                Add Projects
            </button>
        </div>

        {/* {data.length === 0 ?(
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                <p>No Projects added yet</p>
                <p className='text-sm'>Click "Add Education" to add your education details</p>
            </div>
        ):( */}
            <div className='space-y-4 mt-6'>
                {data.map((project,index)=> (
                    <div key={index} className='border p-4 border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Project - {index+1}</h4>
                            <button className= 'text-red-500 hover:text-red-700 transition-colors' onClick={()=>removeProject(index)}>
                                <Trash2Icon className='size-4' />
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={project.name || ""} onChange={(e)=>updateProject(index,"name",e.target.value)} type="text" placeholder= "Project Name" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={project.type || ""} onChange={(e)=>updateProject(index,"type",e.target.value)} type="text" placeholder= "Project Type/Technologies " className='px-3 py-2 text-sm'/>
                            <div className="col-span-2">
                                <div className='flex items-center justify-between mb-1'>
                                    <label className='text-sm font-medium text-gray-700'>Description</label>
                                    <button onClick={()=>generateDescription(index)} disabled={generatingIndex === index || !project.name} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                        {generatingIndex === index ? (
                                            <Loader2 className='w-3 h-3 animate-spin' />
                                        ) : (
                                            <Sparkle className='w-3 h-3 ' />
                                        )}
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea value={project.description || ""} rows={4} onChange={(e)=>updateProject(index,"description",e.target.value)} type="text" placeholder='Describe your project' className='w-full px-3 py-2 text-sm rounded-lg resize-none'/>
                            </div>
                            <input value={project.link || ""} onChange={(e)=>updateProject(index,"link",e.target.value)} type="text" placeholder='Project Link (Optional)' className='w-full px-2 py-1 text-xs rounded-lg col-span-2' style={{height: '28px'}}/>
                        </div>


                        {/* <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-gray-700'>Description</label>
                                <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                    <Sparkle className='w-3 h-3 ' />
                                    Enhance with AI
                                </button>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>
        {/* ) */}
        {/* /} */}

    </div>
  )
}
export default ProjectForm