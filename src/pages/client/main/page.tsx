import { useState, type FormEvent } from "react";
import { LanguageChanger, MapWidget } from "@/widgets";
import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import type { CargoResponseType } from "@/entities/cargo/model";
import { useTranslation } from "react-i18next";

export const MainPage = () => {
    const { t } = useTranslation()
    const [code, setCode] = useState("");
    const [data, setData] = useState<CargoResponseType | null>(null)

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
            setData(response)
        } catch (err) {
            console.error(err);
        }
    };

    console.log(data, "data");

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/logistic.webp')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center gap-4 md:gap-8 px-4 md:px-[7%] py-4">
                {/* Input Container */}
                <div className="w-full md:w-1/2 h-auto md:h-[45rem] bg-white/85 shadow-lg rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-end">
                        <LanguageChanger />
                    </div>
                    <div className="h-1/4 md:h-1/5 flex justify-center items-center">
                        <img src="/logo.png" alt="Logo" className="w-4/5 h-auto object-contain" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="code-input"
                            placeholder={t("main.input.enterCode")}
                            value={code}
                            onChange={handleChange}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
                                </svg>
                            }
                        />
                        <CustomButton type="submit" text={t("main.buttons.submit")} style={{ marginTop: "1rem" }} />
                    </form>
                </div>

                {/* Map Widget */}
                <div className="w-full h-[25rem] md:h-[45rem] rounded-lg overflow-hidden">
                    <MapWidget />
                </div>
            </div>
        </div>
    );
};
