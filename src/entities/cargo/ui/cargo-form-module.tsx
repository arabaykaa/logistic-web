import {
    lazy,
    useCallback,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import {
    apiRequest,
    CustomButton,
    Path,
    SelectInput,
    TextInput,
} from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import type { CargoRequestType, CargoResponseType } from "../model";
import { DateInput } from "@/shared/components/date-input";
import { useTranslation } from "react-i18next";
import type { OptionType } from "@/shared/global-types";

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"));

type Params = {
    containerId: string;
};

export default function CargoFormModule() {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { containerId } = useParams<Params>();

    const [errors, setErrors] = useState<Partial<Record<keyof CargoRequestType, string>>>({});
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CargoRequestType>(initialState);

    const fetchData = useCallback(async () => {
        if (!containerId) return;

        try {
            const response = await apiRequest<void, CargoResponseType>(
                "GET",
                Path.Containers.getById(containerId)
            );

            setFormData({
                ...response,
                deliveryDate: response.deliveryDate ? new Date(response.deliveryDate) : null,
                portEntryDate: response.portEntryDate ? new Date(response.portEntryDate) : null,
                documentReceivedDate: response.documentReceivedDate ? new Date(response.documentReceivedDate) : null,
                etd: response.etd ? new Date(response.etd) : null,
                atd: response.atd ? new Date(response.atd) : null,
                chinaArrivalDate: response.chinaArrivalDate ? new Date(response.chinaArrivalDate) : null,
                inlandDepartureDate: response.inlandDepartureDate ? new Date(response.inlandDepartureDate) : null,
                kashgarArrivalDate: response.kashgarArrivalDate ? new Date(response.kashgarArrivalDate) : null,
                finalArrivalDate: response.finalArrivalDate ? new Date(response.finalArrivalDate) : null,
                isRented: response.isRented ?? null,
                clientName: response.clientName ?? null,
                containerNumber: response.containerNumber ?? null,
                delayReason: response.delayReason ?? null,
                extraCosts: response.extraCosts ?? null,
                portStorageDays: response.portStorageDays ?? null,
            });

            setError(null);
        } catch (err) {
            console.error(err);
            setError("Ошибка при загрузке данных");
        }
    }, [containerId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (field: keyof CargoRequestType) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateChange = (field: keyof CargoRequestType) => (date: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date,
        }));
    };

    const handleSelectChange = (field: keyof CargoRequestType) => (option: OptionType | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: option?.value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CargoRequestType, string>> = {};

        if (!formData.clientName?.trim()) {
            newErrors.clientName = t("form.errors.required");
        }
        if (!formData.containerNumber?.trim()) {
            newErrors.containerNumber = t("form.errors.required");
        }
        // if (!formData.isRented) {
        //     newErrors.isRented = t("form.errors.required");
        // }
        if (!formData.deliveryDate) {
            newErrors.deliveryDate = t("form.errors.required");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await apiRequest<CargoRequestType, unknown>(
                "POST",
                Path.Containers.create,
                formData
            );
            navigate("/cargo");
        } catch (err) {
            console.error("Ошибка при создании груза:", err);
            setError("Не удалось создать груз");
        }
    };

    const isRentedOptions = [
        { value: "purchase", label: t("form.label.purchase") },
        { value: "rent", label: t("form.label.rent") },
    ];

    return (
        <>
            <h2 className="text-[2.25rem] font-semibold mb-4">{t("pages.titles.add_container")}</h2>
            <RouteBackButton />
            {error && <p className="text-red-500">{error}</p>}

            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded-lg border border-gray-400 flex flex-col gap-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextInput
                        label="clientName"
                        placeholder="clientName"
                        value={formData.clientName}
                        onChange={handleChange("clientName")}
                        error={errors.clientName}
                    />
                    <TextInput
                        label="containerNumber"
                        placeholder="containerNumber"
                        value={formData.containerNumber}
                        onChange={handleChange("containerNumber")}
                        error={errors.containerNumber}
                    />
                    <SelectInput
                        label="isRented"
                        placeholder="choose"
                        value={formData.isRented}
                        onChange={handleSelectChange("isRented")}
                        options={isRentedOptions}
                        error={errors.isRented}
                    />

                    <DateInput
                        label="deliveryDate"
                        placeholder="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleDateChange("deliveryDate")}
                        error={errors.deliveryDate}
                    />
                    <DateInput
                        label="portEntryDate"
                        placeholder="portEntryDate"
                        value={formData.portEntryDate}
                        onChange={handleDateChange("portEntryDate")}
                    />
                    <DateInput
                        label="documentReceivedDate"
                        placeholder="documentReceivedDate"
                        value={formData.documentReceivedDate}
                        onChange={handleDateChange("documentReceivedDate")}
                    />
                    <DateInput
                        label="etd"
                        placeholder="etd"
                        value={formData.etd}
                        onChange={handleDateChange("etd")}
                    />
                    <DateInput
                        label="atd"
                        placeholder="atd"
                        value={formData.atd}
                        onChange={handleDateChange("atd")}
                    />
                    <TextInput
                        label="portStorageDays"
                        placeholder="portStorageDays"
                        value={formData.portStorageDays ?? ""}
                        onChange={handleChange("portStorageDays")}
                    />
                    <TextInput
                        label="extraCosts"
                        placeholder="extraCosts"
                        value={formData.extraCosts ?? ""}
                        onChange={handleChange("extraCosts")}
                    />
                    <DateInput
                        label="chinaArrivalDate"
                        placeholder="chinaArrivalDate"
                        value={formData.chinaArrivalDate}
                        onChange={handleDateChange("chinaArrivalDate")}
                    />
                    <DateInput
                        label="inlandDepartureDate"
                        placeholder="inlandDepartureDate"
                        value={formData.inlandDepartureDate}
                        onChange={handleDateChange("inlandDepartureDate")}
                    />
                    <DateInput
                        label="kashgarArrivalDate"
                        placeholder="kashgarArrivalDate"
                        value={formData.kashgarArrivalDate}
                        onChange={handleDateChange("kashgarArrivalDate")}
                    />
                    <TextInput
                        label="delayReason"
                        placeholder="delayReason"
                        value={formData.delayReason ?? ""}
                        onChange={handleChange("delayReason")}
                    />
                    <DateInput
                        label="finalArrivalDate"
                        placeholder="finalArrivalDate"
                        value={formData.finalArrivalDate}
                        onChange={handleDateChange("finalArrivalDate")}
                    />
                </div>

                <CustomButton
                    text={t("pages.buttons.submit")}
                    type="submit"
                    style={{ marginTop: "1rem" }}
                />
            </form>
        </>
    );
}

const initialState: CargoRequestType = {
    clientName: "",
    containerNumber: "",
    isRented: null,
    deliveryDate: null,
    portEntryDate: null,
    documentReceivedDate: null,
    etd: null,
    atd: null,
    portStorageDays: "",
    extraCosts: "",
    chinaArrivalDate: null,
    inlandDepartureDate: null,
    kashgarArrivalDate: null,
    delayReason: "",
    finalArrivalDate: null,
};

