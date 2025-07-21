import { forwardRef } from "react";
import type { JSX } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { CalendarIcon } from "../assets";

interface Props {
    icon?: JSX.Element;
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    name?: string;
    className?: string;
    error?: string;
}

export const DateInput = ({
    icon,
    label,
    value,
    onChange,
    placeholder,
    name,
    className = "",
    error
}: Props) => {
    const { t } = useTranslation();

    const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
        <div className="relative w-full">
            <input
                type="text"
                readOnly
                value={value}
                placeholder={placeholder ? t(`form.label.${placeholder}`) : ""}
                name={name}
                onClick={onClick}
                ref={ref}
                className={`
                    w-full px-3 pr-10 py-[5.2px] text-base rounded-md bg-white text-gray-900
                    border transition-all duration-200 cursor-pointer
                    placeholder-gray-400 placeholder:text-sm
                    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                    ${className}
                `}
            />
            <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={onClick}
            >
                {icon ?? <CalendarIcon />}
            </div>
        </div>
    ));

    CustomInput.displayName = "CustomDateInput";

    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-semibold mb-1 text-gray-700">
                    {t(`form.label.${label}`)}
                </label>
            )}

            <DatePicker
                selected={value}
                onChange={onChange}
                customInput={<CustomInput />}
                dateFormat="yyyy-MM-dd"
                wrapperClassName="w-full"
                popperPlacement="bottom-start"
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};
