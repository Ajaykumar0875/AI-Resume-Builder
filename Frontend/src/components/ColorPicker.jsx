import React from 'react'
import { Check, Palette } from 'lucide-react';

const ColorPicker = ({ selectedColor, onChange }) => {
   
    const colors = [
        {name: "Blue", value: "#3b82f6"},
        {name: "Red", value: "#ef4444"},
        {name: "Green", value: "#10b981"},
        {name: "Yellow", value: "#f59e0b"},
        {name: "Purple", value: "#8b5cf6"},
        {name: "Pink", value: "#ec4899"},
        {name: "Orange", value: "#f97316"},
        {name: "Teal", value: "#14b8a6"},
        {name: "Lime", value: "#84cc16"},
        {name: "Cyan", value: "#06b6d4"},
        {name: "Indigo", value: "#6366f1"},
        {name: "Violet", value: "#a78bfa"},
        {name: "Magenta", value: "#d946ef"},
        {name: "Crimson", value: "#dc2626"},
        {name: "Goldenrod", value: "#fbbf24"},
        {name: "Aqua", value: "#7fdbff"},
        {name: "Lavender", value: "#e0e7ff"},
        {name: "Fuchsia", value: "#f472b6"},
        {name: "Brown", value: "#a16207"},
        {name: "Coral", value: "#fb7185"},
        {name: "Mint", value: "#2dd4bf"},
        {name: "Slate", value: "#64748b"},
        {name: "Charcoal", value: "#334155"},
        {name: "Peach", value: "#fdba74"},
        {name: "Sky", value: "#38bdf8"},
        {name: "Rose", value: "#f43f5e"},
        {name: "Sand", value: "#f5e7c4"},
        {name: "Emerald", value: "#34d399"},
        {name: "Azure", value: "#007FFF"},
        {name: "Moss", value: "#8A9A5B"},
        {name: "Copper", value: "#B87333"},
        {name: "Ruby", value: "#E0115F"},
        {name: "Periwinkle", value: "#CCCCFF"},
        {name: "Pumpkin", value: "#FF7518"},
        {name: "Seafoam", value: "#93E9BE"},
        {name: "Platinum", value: "#E5E4E2"},
        {name: "Mulberry", value: "#C54B8C"},
        {name: "Jade", value: "#00A86B"},
        {name: "Tangerine", value: "#FFA500"},
        {name: "Sapphire", value: "#0F52BA"},
        {name: "Amethyst", value: "#9966CC"},
        {name: "Lemon", value: "#FFF700"},
        {name: "Graphite", value: "#383838"},
        {name: "Cerulean", value: "#2A52BE"},
        {name: "Apricot", value: "#FBCEB1"},
        {name: "Mint Cream", value: "#F5FFFA"},
        {name: "Rosewood", value: "#65000B"},
    ]

    const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='relative'>
        <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size = {16} /> <span className='max-sm:hidden'>Accent</span>

        </button>

        {isOpen && (
            <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-md max-h-64 overflow-y-auto">
                {colors.map((color) =>(
                    <div onClick={() => {onChange(color.value); setIsOpen(false)}} key={color.value} className='relative cursor-pointer group flex flex-col'> 
                        <div className= {`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`}
                        style={{backgroundColor: color.value}}>
                        </div>
                        {selectedColor === color.value && (
                            <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                                <Check className="size-5 text-white" />
                            </div>
                        )}
                        <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}
export default ColorPicker