import { useState, type FormEvent } from "react";
import { LanguageChanger } from "@/widgets";
import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import type { CargoResponseType } from "@/entities/cargo/model";
import { useTranslation } from "react-i18next";

export const MainPage = () => {
    const { t } = useTranslation();
    const [code, setCode] = useState("");
    const [data, setData] = useState<CargoResponseType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!code) return;

        try {
            const response = await apiRequest<void, CargoResponseType>(
                "GET",
                Path.Containers.getById(code)
            );
            setData(response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-green-100 flex items-center justify-center px-4">
            <div className="w-full h-[70vh] bg-white shadow-md flex flex-col justify-center items-center relative">
                {/* Лого в левом верхнем углу */}
                <div className="absolute top-4 left-4 w-16 h-auto">
                    <img src="/logo.webp" alt="Logo" className="w-full h-auto" />
                </div>

                {/* Переключатель языка (опционально можно переместить в правый верх) */}
                <div className="absolute top-4 right-4">
                    <LanguageChanger />
                </div>

                {/* Форма по центру */}
                <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col items-center gap-4 px-4">
                    <TextInput
                        id="code-input"
                        customPlaceholder={t("main.input.enterCode")}
                        value={code}
                        onChange={handleChange}
                        variant="underline"
                        inputClassName="py-1 border-b-2 border-black focus:border-b-4 outline-none rounded-none border-t-0 border-l-0 border-r-0 text-2xl"

                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
                            </svg>
                        }
                    />
                    <CustomButton
                        type="submit"
                        text={t("main.buttons.submit")}
                        className="w-full text-xl py-2"
                    />
                </form>
            </div>
        </div>
    );
};
