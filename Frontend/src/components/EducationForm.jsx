import { GraduationCap, Plus, Trash2Icon, Sparkle } from 'lucide-react';
import React from 'react'


const EducationForm = ({data,onChange}) => {
  
 const addEducation = ()=>{
    const newEducation ={
        institution:"",
        degree:"",
        field:"",
        graduation_date:"",
        gpa:"",
    };  

    onChange([...data, newEducation]);
  }


  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index,field,value) => {
    const updated = [...data];
    updated[index] = {...updated[index],[field]: value};
    onChange(updated);
  };

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
                <h3>Education</h3>
                <p className='text-sm text-gray-500'>Add your education details</p>
            </div>
            <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700
            rounded-lg hover:bg-orange-200 transition-colors'>
                <Plus className='size-4' />
                Add Education
            </button>
        </div>

        {data.length === 0 ?(
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                <p>No education added yet</p>
                <p className='text-sm'>Click "Add Education" to add your education details</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((education,index)=> (
                    <div key={index} className='border p-4 border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4>Education - {index+1}</h4>
                            <button className= 'text-red-500 hover:text-red-700 transition-colors' onClick={()=>removeEducation(index)}>
                                <Trash2Icon className='size-4' />
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>
                            <input value={education.institution || ""} onChange={(e)=>updateEducation(index,"institution",e.target.value)} type="text" placeholder= "Institution Name" className='px-3 py-2 text-sm'/>
                            <input value={education.degree || ""} onChange={(e)=>updateEducation(index,"degree",e.target.value)} type="text" placeholder= "Degree(e.g., Bachelors,Master's) " className='px-3 py-2 text-sm'/>
                            <input value={education.field || ""} onChange={(e)=>updateEducation(index,"field",e.target.value)} type="text" placeholder='Field of Study' className='px-3 py-2 text-sm'/>
                            <input value={formatDateForInput(education.graduation_date)} onChange={(e)=>updateEducation(index,"graduation_date",e.target.value)} type="month" className='px-3 py-2 text-sm disabled:bg-gray-100'/>
                        </div>

                        
                        <input value={education.gpa || ""} onChange={(e)=>updateEducation(index,"gpa",e.target.value)} type="text" placeholder='GPA(Optional)' className='px-3 py-2 text-sm'/>

                            

                        
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}
export default EducationForm