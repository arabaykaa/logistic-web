import type { JSX } from "react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    label?: string;
}

export const TextInput = ({ icon, label, className = "", ...props }: Props) => {
    return (
        <div className="w-full relative">
            {label && <label className="block text-xs font-semibold mb-1">{label}</label>}
            <input
                {...props}
                className={`w-full px-3 pr-10 py-2 text-base rounded-md outline-none bg-white/90 text-gray-900 border border-black/10 transition-all ${className}`}
            />
            {icon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none text-gray-600">
                    {icon}
                </span>
            )}
        </div>
    );
};
