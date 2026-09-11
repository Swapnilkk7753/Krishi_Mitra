import { useState } from "react";
import { cn } from "../config/helper";

export const Toggle = ({ isChecked = true, id }) => {
    const [enabled, setEnabled] = useState(isChecked);

    return (
      <div className="relative inline-flex items-center cursor-pointer">
            <input 
                id={id} 
                type="checkbox" 
                checked={enabled} 
                onChange={() => setEnabled(!enabled)}
                className="peer sr-only" 
            />
            <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
            <div className="absolute left-1 top-1 size-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4"></div>
      </div>
    );
};


export const Input = ({className, placeholder, id, name, value, onChange, type}) => {
    return (
        <div className={cn(className, 'w-full')}>
            <input id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} type={type || "text"} className="px-3 w-full py-2 border border-gray-400 focus:border-transparent rounded-xl focus:outline-green-500" />
        </div>
    )
}