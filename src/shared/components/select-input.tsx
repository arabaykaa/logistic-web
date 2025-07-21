import Select, { type SingleValue, type StylesConfig } from 'react-select';
import type { OptionType } from '../global-types';
import { useTranslation } from 'react-i18next';

type Props = {
    value: string | null;
    onChange: (option: OptionType | null) => void;
    options: OptionType[];
    label?: string;
    placeholder?: string;
    error?: string;
};

export const SelectInput = ({
    value,
    onChange,
    options,
    label,
    placeholder,
    error,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-semibold mb-1 text-gray-700">
                    {t(`form.label.${label}`)}
                </label>
            )}

            <Select<OptionType, false>
                value={options.find((item) => item.value === value)}
                onChange={onChange as (option: SingleValue<OptionType>) => void}
                options={options}
                isClearable
                placeholder={t(`form.label.${placeholder}`)}
                styles={getCustomStyles(error)}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};


const getCustomStyles = (error?: string): StylesConfig<OptionType, false> => ({
    control: (provided, state) => ({
        ...provided,
        borderColor: error ? '#f87171' : (state.isFocused ? '#60a5fa' : '#d1d5db'),
        boxShadow: 'none',
        '&:hover': {
            borderColor: error ? '#f87171' : '#9ca3af',
        },
        borderWidth: '1px',
        borderRadius: '0.5rem',
        fontSize: '14px',
        minHeight: '38px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
        color: '#111827',
        cursor: 'pointer',
        fontSize: '14px',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#fff',
        zIndex: 10,
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '14px',
        color: '#9ca3af',
    }),
});
