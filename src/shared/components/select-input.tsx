import Select, { type SingleValue, type StylesConfig } from 'react-select';
import type { OptionType } from '../global-types';
import { useTranslation } from 'react-i18next';

type Props = {
    value: OptionType | null;
    onChange: (option: OptionType | null) => void;
    options: OptionType[];
    label?: string;
    placeholder?: string;
};

export const SelectInput = ({ value, onChange, options, label, placeholder }: Props) => {
    const { t } = useTranslation()
    return (
        <div className="w-full">
            {label && <label className="block text-xs font-semibold mb-1">{t(`form.label.${label}`)}</label>}
            <Select<OptionType, false>
                value={value}
                onChange={onChange as (option: SingleValue<OptionType>) => void}
                options={options}
                isClearable
                placeholder={t(`form.label.${placeholder}`)}
                styles={customStyles}
            />
        </div>
    )
}

const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
        ...provided,
        '&:hover': {
            borderColor: state.isFocused ? 'blue' : provided.borderColor,
        },
        borderRadius: "0.5rem",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#ddd' : '#fff',
        color: '#333',
        cursor: 'pointer',
        fontSize: "12px",
        fontWeight: 500
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#fff',
        zIndex: 2,
    }),
};
