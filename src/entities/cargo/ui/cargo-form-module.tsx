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

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"));

type Params = {
    containerId: string;
};

export default function CargoFormModule() {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { containerId } = useParams<Params>();
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
                latitude: response.latitude ?? 0,
                longitude: response.longitude ?? 0,
                deliveryDate: response.deliveryDate ? new Date(response.deliveryDate) : null,
                portEntryDate: response.portEntryDate ? new Date(response.portEntryDate) : null,
                documentDeadline: response.documentDeadline ? new Date(response.documentDeadline) : null,
                documentReceivedDate: response.documentReceivedDate ? new Date(response.documentReceivedDate) : null,
                etd: response.etd ? new Date(response.etd) : null,
                atd: response.atd ? new Date(response.atd) : null,
                chinaArrivalDate: response.chinaArrivalDate ? new Date(response.chinaArrivalDate) : null,
                inlandDepartureDate: response.inlandDepartureDate ? new Date(response.inlandDepartureDate) : null,
                kashgarArrivalDate: response.kashgarArrivalDate ? new Date(response.kashgarArrivalDate) : null,
                finalArrivalDate: response.finalArrivalDate ? new Date(response.finalArrivalDate) : null,
                createdAt: response.createdAt ? new Date(response.createdAt) : null,
                updatedAt: response.updatedAt ? new Date(response.updatedAt) : null,
                isRented: response.isRented ?? null,
                clientName: response.clientName ?? null,
                containerNumber: response.containerNumber ?? null,
                delayReason: response.delayReason ?? null,
                expeditor: response.expeditor ?? null,
                extraCosts: response.extraCosts ?? null,
                notes: response.notes ?? null,
                portStorageDays: response.portStorageDays ?? null,
                positionStatus: response.positionStatus ?? null,
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
            [field]: field === "latitude" || field === "longitude" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleDateChange = (field: keyof CargoRequestType) => (date: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date,
        }));
    };

    const handleSelectChange = <K extends keyof CargoRequestType>(field: K) =>
        (option: { value: string } | null) => {
            setFormData((prev) => ({
                ...prev,
                [field]: option?.value ?? null,
            }));
        };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

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
                    <TextInput label="clientName" value={formData.clientName} onChange={handleChange("clientName")} />
                    <TextInput label="containerNumber" value={formData.containerNumber} onChange={handleChange("containerNumber")} />
                    <TextInput label="expeditor" value={formData.expeditor} onChange={handleChange("expeditor")} />
                    <SelectInput
                        label="isRented"
                        placeholder="choose"
                        value={isRentedOptions.find((opt) => opt.value === formData.isRented?.value) || null}
                        onChange={handleSelectChange("isRented")}
                        options={isRentedOptions}
                    />

                    <DateInput label="deliveryDate" value={formData.deliveryDate} onChange={handleDateChange("deliveryDate")} />
                    <DateInput label="portEntryDate" value={formData.portEntryDate} onChange={handleDateChange("portEntryDate")} />

                    <DateInput label="documentDeadline" value={formData.documentDeadline} onChange={handleDateChange("documentDeadline")} />
                    <DateInput label="documentReceivedDate" value={formData.documentReceivedDate} onChange={handleDateChange("documentReceivedDate")} />
                    <DateInput label="etd" value={formData.etd} onChange={handleDateChange("etd")} />

                    <DateInput label="atd" value={formData.atd} onChange={handleDateChange("atd")} />
                    <TextInput label="portStorageDays" value={formData.portStorageDays} onChange={handleChange("portStorageDays")} />
                    <TextInput label="extraCosts" value={formData.extraCosts} onChange={handleChange("extraCosts")} />

                    <DateInput label="chinaArrivalDate" value={formData.chinaArrivalDate} onChange={handleDateChange("chinaArrivalDate")} />
                    <DateInput label="inlandDepartureDate" value={formData.inlandDepartureDate} onChange={handleDateChange("inlandDepartureDate")} />
                    <DateInput label="kashgarArrivalDate" value={formData.kashgarArrivalDate} onChange={handleDateChange("kashgarArrivalDate")} />

                    <TextInput label="positionStatus" value={formData.positionStatus} onChange={handleChange("positionStatus")} />
                    <TextInput label="delayReason" value={formData.delayReason} onChange={handleChange("delayReason")} />
                    <DateInput label="finalArrivalDate" value={formData.finalArrivalDate} onChange={handleDateChange("finalArrivalDate")} />

                    <TextInput label="notes" value={formData.notes} onChange={handleChange("notes")} />
                    <TextInput label="latitude" value={formData.latitude.toString()} onChange={handleChange("latitude")} />
                    <TextInput label="longitude" value={formData.longitude.toString()} onChange={handleChange("longitude")} />

                    <DateInput label="createdAt" value={formData.createdAt} onChange={handleDateChange("createdAt")} />
                    <DateInput label="updatedAt" value={formData.updatedAt} onChange={handleDateChange("updatedAt")} />
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
    expeditor: "",
    isRented: null,
    deliveryDate: null,
    portEntryDate: null,
    documentDeadline: null,
    documentReceivedDate: null,
    etd: null,
    atd: null,
    portStorageDays: "",
    extraCosts: "",
    chinaArrivalDate: null,
    inlandDepartureDate: null,
    kashgarArrivalDate: null,
    positionStatus: "",
    delayReason: "",
    finalArrivalDate: null,
    notes: "",
    latitude: 0,
    longitude: 0,
    createdAt: null,
    updatedAt: null,
};

