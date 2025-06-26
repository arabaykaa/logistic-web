import { useState } from "react";
import { MapWidget } from "@/widgets";
import { CustomButton, TextInput } from "@/shared";

export const MainPage = () => {
    const [code, setCode] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/logistic.webp')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center gap-4 md:gap-8 px-4 md:px-[7%] py-4">
                {/* Input Container */}
                <div className="w-full md:w-1/2 h-auto md:h-[45rem] bg-white/85 shadow-lg rounded-xl p-4 flex flex-col gap-4">
                    <div className="h-1/4 md:h-1/3 flex justify-center items-center">
                        <img src="/logo.png" alt="Logo" className="w-4/5 h-auto object-contain" />
                    </div>

                    <TextInput
                        id="code-input"
                        placeholder="Введите код или адрес..."
                        value={code}
                        onChange={handleChange}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
                            </svg>
                        }
                    />
                    <CustomButton text="Подтвердить" />
                </div>

                {/* Map Widget */}
                <div className="w-full h-[25rem] md:h-[45rem] rounded-lg overflow-hidden">
                    <MapWidget />
                </div>
            </div>
        </div>
    );
};
