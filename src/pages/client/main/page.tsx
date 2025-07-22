import { useState, type FormEvent } from "react";
import { LanguageChanger, Loading } from "@/widgets";
import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import type { CargoResponseType } from "@/entities/cargo/model";
import { useTranslation } from "react-i18next";

type RenderFieldProps = {
    key?: number
    text: string
    value: string | number | Date | null | undefined;
    type?: string
}

export const MainPage = () => {
    const { t } = useTranslation();
    const [code, setCode] = useState("");
    const [data, setData] = useState<CargoResponseType | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!code) return;

        setData(null)
        setIsLoading(true)
        try {
            const response = await apiRequest<void, CargoResponseType>(
                "GET",
                Path.Containers.getById(code)
            );
            setData(response);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const arrToIterate: RenderFieldProps[] = [
        { key: 1, text: "clientName", value: data?.clientName },
        { key: 2, text: "containerNumber", value: data?.containerNumber },
        { key: 3, text: "isRented", value: data?.isRented, type: "select" },
        { key: 4, text: "portStorageDays", value: data?.portStorageDays },
        { key: 5, text: "extraCosts", value: data?.extraCosts },
        { key: 6, text: "delayReason", value: data?.delayReason },
        { key: 7, text: "deliveryDate", value: data?.deliveryDate, type: "date" },
        { key: 8, text: "portEntryDate", value: data?.portEntryDate, type: "date" },
        { key: 9, text: "documentReceivedDate", value: data?.documentReceivedDate, type: "date" },
        { key: 10, text: "etd", value: data?.etd, type: "date" },
        { key: 11, text: "atd", value: data?.atd, type: "date" },
        { key: 12, text: "chinaArrivalDate", value: data?.chinaArrivalDate, type: "date" },
        { key: 13, text: "inlandDepartureDate", value: data?.inlandDepartureDate, type: "date" },
        { key: 14, text: "kashgarArrivalDate", value: data?.kashgarArrivalDate, type: "date" },
        { key: 15, text: "finalArrivalDate", value: data?.finalArrivalDate, type: "date" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#0e363e] flex items-center flex-col gap-8 px-[4%] pb-6">
            <div className="w-full max-w-[35rem] relative h-20">
                <div className="absolute top-6 w-16 h-auto">
                    <img src="logo_transparent_gre.svg" alt="Logo" className="w-full h-auto" />
                </div>
                <div className="absolute top-6 right-0">
                    <LanguageChanger />
                </div>
            </div>
            <div className="w-full max-w-[35rem] bg-white shadow-md flex flex-col justify-end items-center relative p-6 rounded-lg">
                <h2 className="text-pretty font-bold text-[#25ab6c] mb-8">{t("main.howToSearch")}</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col items-center gap-4">
                    <TextInput
                        id="code-input"
                        customPlaceholder={t("main.input.enterCode")}
                        value={code}
                        onChange={handleChange}
                        variant="underline"
                        inputClassName="py-1 border-b-1 border-black focus:border-b-2 outline-none rounded-none border-t-0 border-l-0 border-r-0 text-[24px]"

                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
                            </svg>
                        }
                    />
                    <CustomButton
                        type="submit"
                        isLoading={isLoading}
                        text={t("main.buttons.search")}
                        className="w-full text-xl py-2"
                    />
                </form>
            </div>
            {isLoading &&
                <div className="relative h-[50vh]">
                    <Loading isPageLoading={false} color="text-white" />
                </div>}
            {data && (
                <div className="w-full max-w-[35rem] h-auto bg-white shadow-md flex flex-col gap-4 items-start relative p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-[#0e363e]">{t("main.searchResult")}</h2>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800">
                        {arrToIterate.map((item) => {
                            if (item.value === null || item.value === undefined || item.value === "") return null;
                            let displayValue: string;

                            if (item.type === "date") {
                                const date = new Date(item.value);
                                displayValue =
                                    date.toString() !== "Invalid Date"
                                        ? date.toLocaleDateString("ru-RU").replace(/\//g, ".").replace(",", "")
                                        : "-";
                            } else if (item.type === "select") {
                                displayValue = t(`form.label.${item.value}`);
                            } else {
                                displayValue = String(item.value);
                            }
                            return (
                                <div key={item.key} className="flex justify-between text-[#0e363e]">
                                    <div className="w-[60%]">
                                        <p className="font-semibold">
                                            {t(`form.label.${item.text}`)}:
                                        </p>
                                    </div>
                                    <div className="w-[38%]">
                                        {displayValue}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
