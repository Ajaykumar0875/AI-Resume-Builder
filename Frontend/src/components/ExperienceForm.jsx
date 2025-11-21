import api from '../configs/api';
import { Briefcase, Loader2, Plus, Sparkle, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';

const ExperienceForm = ({data,onChange}) => {

    const {token} = useSelector((state)=>state.auth);
    const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = ()=>{
    const newExperience ={
        company:"",
        position:"",
        start_date:"",
        end_date:"",
        description:"",
        is_current:false
    };

    onChange([...data, newExperience]);
  }


  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index,field,value) => {
    const updated = [...data];
    updated[index] = {...updated[index],[field]: value};
    onChange(updated);
  };

  const generateDescription = async(index)=>{
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `enchance this job description for ${experience.description} for the position of ${experience.position} at ${experience.company}`;

    try{
        const {data} = await api.post("/api/ai/enhance-job-desc",{userContent: prompt},{
            headers:{
                Authorization: token
            }
        })
        updateExperience(index,"description",data.enhancedContent);
    }
    catch(error){
        toast.error(error.message);
    }    
    finally{
        setGeneratingIndex(-1);
    }
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}$/.test(dateString)) return dateString;
    const months = {
        "January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06",
        "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12",
        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "Jun": "06",
        "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    const parts = dateString.split(' ');
    if (parts.length === 2) {
        const month = months[parts[0]];
        const year = parts[1];
        if (month && year) return `${year}-${month}`;
    }
    return "";
  };


  return (
    <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3>Professional Experience</h3>
                <p className='text-sm text-gray-500'>Add your job experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700
            rounded-lg hover:bg-orange-200 transition-colors'>
                <Plus className='size-4' />
                Add Experience
            </button>
        </div>

        {data.length === 0 ?(
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                <p>No experience added yet</p>
                <p className='text-sm'>Click "Add Experience" to add your job experience</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((experience,index)=> (
                    <div key={index} className='border p-4 border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Experience -  {index+1}</h4>
                            <button className= 'text-red-500 hover:text-red-700 transition-colors' onClick={()=>removeExperience(index)}>
                                <Trash2Icon className='size-4' />
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={experience.company || ""} onChange={(e)=>updateExperience(index,"company",e.target.value)} type="text" placeholder= "Company Name" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={experience.position || ""} onChange={(e)=>updateExperience(index,"position",e.target.value)} type="text" placeholder= "Job Title" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={formatDateForInput(experience.start_date)} onChange={(e)=>updateExperience(index,"start_date",e.target.value)} type="month" className='px-3 py-2 text-sm rounded-lg'/>
                            <input value={formatDateForInput(experience.end_date)} onChange={(e)=>updateExperience(index,"end_date",e.target.value)} type="month" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'/>
                        </div>
                        <label className="mb-5 inline-flex items-center gap-2">
                            <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>updateExperience(index,"is_current",e.target.checked ? true: false )}
                            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                            <span className='text-sm text-gray-700'>Currently working here</span>
                        </label>

                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-gray-700'>Job Description</label>
                                <button onClick={()=>generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                    {generatingIndex === index ? (
                                        <Loader2 className='w-3 h-3 animate-spin' />
                                    ) : (
                                        <Sparkle className='w-3 h-3 ' />
                                    )}
                                    Enhance with AI
                                </button>
                            </div>

                            <textarea rows={4} value={experience.description || ""} onChange = {(e)=>updateExperience(index,"description",e.target.value)} className='w-full text-sm px-3 py-2 rounded-lg resize-none '
                            placeholder='Describe your key responsibilities and achievements...'/>
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}
export default ExperienceForm