import {
    apiRequest,
    CustomButton,
    Path,
    TextInput,
} from "@/shared";
import {
    lazy,
    useCallback,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CargoRequestType, CargoResponseType } from "../model";
import { DateInput } from "@/shared/components/date-input";

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"));

type Params = {
    containerId: string;
};

export default function CargoFormModule() {
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

    return (
        <>
            <h2 className="text-[2.25rem] font-semibold mb-4">Добавление груза</h2>
            <RouteBackButton />
            {error && <p className="text-red-500">{error}</p>}

            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded-lg border border-gray-400 flex flex-col gap-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextInput label="Client Name" value={formData.clientName} onChange={handleChange("clientName")} />
                    <TextInput label="Container Number" value={formData.containerNumber} onChange={handleChange("containerNumber")} />
                    <TextInput label="Expeditor" value={formData.expeditor} onChange={handleChange("expeditor")} />

                    <TextInput label="Is Rented" value={formData.isRented} onChange={handleChange("isRented")} />
                    <DateInput label="Delivery Date" value={formData.deliveryDate} onChange={handleDateChange("deliveryDate")} />
                    <DateInput label="Port Entry Date" value={formData.portEntryDate} onChange={handleDateChange("portEntryDate")} />

                    <DateInput label="Document Deadline" value={formData.documentDeadline} onChange={handleDateChange("documentDeadline")} />
                    <DateInput label="Document Received Date" value={formData.documentReceivedDate} onChange={handleDateChange("documentReceivedDate")} />
                    <DateInput label="ETD" value={formData.etd} onChange={handleDateChange("etd")} />

                    <DateInput label="ATD" value={formData.atd} onChange={handleDateChange("atd")} />
                    <TextInput label="Port Storage Days" value={formData.portStorageDays} onChange={handleChange("portStorageDays")} />
                    <TextInput label="Extra Costs" value={formData.extraCosts} onChange={handleChange("extraCosts")} />

                    <DateInput label="China Arrival Date" value={formData.chinaArrivalDate} onChange={handleDateChange("chinaArrivalDate")} />
                    <DateInput label="Inland Departure Date" value={formData.inlandDepartureDate} onChange={handleDateChange("inlandDepartureDate")} />
                    <DateInput label="Kashgar Arrival Date" value={formData.kashgarArrivalDate} onChange={handleDateChange("kashgarArrivalDate")} />

                    <TextInput label="Position Status" value={formData.positionStatus} onChange={handleChange("positionStatus")} />
                    <TextInput label="Delay Reason" value={formData.delayReason} onChange={handleChange("delayReason")} />
                    <DateInput label="Final Arrival Date" value={formData.finalArrivalDate} onChange={handleDateChange("finalArrivalDate")} />

                    <TextInput label="Notes" value={formData.notes} onChange={handleChange("notes")} />
                    <TextInput label="Latitude" value={formData.latitude.toString()} onChange={handleChange("latitude")} />
                    <TextInput label="Longitude" value={formData.longitude.toString()} onChange={handleChange("longitude")} />

                    <DateInput label="Created At" value={formData.createdAt} onChange={handleDateChange("createdAt")} />
                    <DateInput label="Updated At" value={formData.updatedAt} onChange={handleDateChange("updatedAt")} />
                </div>

                <CustomButton
                    text="Подтвердить"
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
    isRented: "rent",
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

