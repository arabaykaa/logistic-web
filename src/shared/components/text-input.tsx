import type { JSX } from "react";
import { useTranslation } from "react-i18next";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element;
    label?: string;
    placeholder?: string;
    customPlaceholder?: string;
    error?: string;
    inputClassName?: string;
    variant?: "default" | "underline"; // ✅ Добавлено
}

export const TextInput = ({
    icon,
    label,
    placeholder,
    customPlaceholder,
    error,
    className = "",
    inputClassName = "",
    variant = "default", // ✅ По умолчанию
    ...props
}: Props) => {
    const { t } = useTranslation();

    const baseStyles = `
        w-full outline-none transition-all 
        placeholder-gray-400 bg-transparent text-gray-900
        ${icon ? "pr-10" : ""}
    `;

    const defaultStyles = `
        ${baseStyles}
        bg-white/90 border ${error ? "border-red-500" : "border-black/10"}
        rounded-md px-3 py-2
    `;

    const underlineStyles = `
        ${baseStyles}
        border-b ${error ? "border-red-500" : "border-black"} border-[2px]
        focus:border-b-2 text-3xl px-1
    `;

    return (
        <div className={`w-full relative ${className}`}>
            {label && (
                <label className="block text-xs font-semibold mb-1 text-gray-700">
                    {t(`form.label.${label}`)}
                </label>
            )}

            <input
                placeholder={
                    customPlaceholder
                        ? customPlaceholder
                        : placeholder
                            ? t(`form.label.${placeholder}`)
                            : ""
                }
                {...props}
                className={`
                    ${variant === "underline" ? underlineStyles : defaultStyles}
                    ${inputClassName}
                `}
            />

            {icon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none text-gray-600">
                    {icon}
                </span>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};
