import React from 'react'

import ClassicTemplate from '../components/templates/ClassicTemplate'
import ModernTemplate from  '../components/templates/ModernTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'
import MinimalImageTemplate from  '../components/templates/MinimalImageTemplate'
import LatestTemplate from '../components/templates/LatestTemplate'

const ResumePreview = ({data,template,accentColor, classes = ""}) => {

    const renderedTemplate = ()=>{
        switch(template){
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>
                break;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>
                break;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>
                break;
            case "latest":
                return <LatestTemplate data={data} accentColor={accentColor}/>
                break;
            case "classic":
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>
                break;  
        }
    }

    return (
    <div className='w-full bg-gray-100'> 

       <div id = "resume-preview" className={"border border-gray-200 print:shadow-none print:border-none" + classes }>
        {renderedTemplate()}
       </div>
       <style>{`
        @page {
            size: letter;
            margin: 0;
        }
        @media print {
            html, body {
                width: 8.5in;
                height: 11in;
                overflow: hidden;
            }
            body * {
                visibility: hidden;
            }
            #resume-preview, #resume-preview * {
                visibility: visible;
            }
            #resume-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: auto;
                margin: 0;
                padding: 0;
                box-shadow: none !important;
                border: none !important;
            }
        }
       `}</style>
    </div>
  )
}
export default ResumePreview