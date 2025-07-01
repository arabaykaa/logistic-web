import { forwardRef } from "react";
import type { JSX } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    icon?: JSX.Element;
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    name?: string;
    className?: string;
}

export const DateInput = ({
    icon,
    label,
    value,
    onChange,
    placeholder,
    name,
    className = ""
}: Props) => {
    const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
        <div className="relative w-full">
            <input
                type="text"
                readOnly
                value={value}
                placeholder={placeholder}
                name={name}
                onClick={onClick}
                ref={ref}
                className={`
          w-full px-3 pr-10 py-2 text-base rounded-md bg-white text-gray-900 border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200 cursor-pointer
          ${className}
        `}
            />
            {icon && (
                <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={onClick}
                >
                    {icon}
                </div>
            )}
        </div>
    ));

    CustomInput.displayName = "CustomDateInput";

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <DatePicker
                selected={value}
                onChange={onChange}
                customInput={<CustomInput />}
                dateFormat="yyyy-MM-dd"
                wrapperClassName="w-full"
                popperPlacement="bottom-start"
            />
        </div>
    );
};
