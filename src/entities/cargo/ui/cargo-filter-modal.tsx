import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CargoSearchParams } from "../model";
import { CustomButton, TextInput } from "@/shared";
import { useTranslation } from "react-i18next";

type Props = {
    onSubmit: (values: CargoSearchParams) => void;
}

export const CargoFilterModal = ({ onSubmit }: Props) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<CargoSearchParams | null>(null);

    const handleChange = (field: keyof CargoSearchParams) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (filter) {
            onSubmit(filter);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col gap-4 w-full"
        >
            <TextInput
                label="clientName"
                placeholder="clientName"
                value={filter?.clientName ?? ""}
                onChange={handleChange("clientName")}
            />
            <TextInput
                label="containerNumber"
                placeholder="containerNumber"
                value={filter?.containerNumber ?? ""}
                onChange={handleChange("containerNumber")}
            />
            <CustomButton
                text={t("pages.buttons.submit")}
                type="submit"
            />
        </form>
    )
}
