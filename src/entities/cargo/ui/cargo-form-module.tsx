import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import { lazy, useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CargoRequestType, CargoResponseType } from "../model";

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"));

type Params = {
    containerId: string;
};

export default function CargoFormModule() {
    const navigate = useNavigate();
    const { containerId } = useParams<Params>();
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<CargoRequestType>({
        name: "",
        clientName: "",
        latitude: 0,
        longitude: 0,
        positionStatus: ""
    });

    const fetchData = useCallback(async () => {
        if (!containerId) return;

        try {
            const response = await apiRequest<void, CargoResponseType>(
                "GET",
                Path.Containers.getById(containerId)
            );

            setFormData({
                name: response.name ?? "",
                clientName: response.clientName ?? "",
                latitude: response.latitude ?? 0,
                longitude: response.longitude ?? 0,
                positionStatus: response.positionStatus ?? ""
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
            [field]: field === "latitude" || field === "longitude" ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await apiRequest<CargoRequestType, unknown>("POST", Path.Containers.create, formData);
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
                className="p-4 bg-white rounded-lg border border-gray-400 flex flex-col gap-4"
            >
                <TextInput
                    id="name"
                    label="Name"
                    placeholder="Enter cargo name"
                    value={formData.name}
                    onChange={handleChange("name")}
                />
                <TextInput
                    id="clientName"
                    label="Client Name"
                    placeholder="Enter client name"
                    value={formData.clientName}
                    onChange={handleChange("clientName")}
                />
                <TextInput
                    id="latitude"
                    label="Latitude"
                    placeholder="Enter latitude"
                    value={formData.latitude.toString()}
                    onChange={handleChange("latitude")}
                />
                <TextInput
                    id="longitude"
                    label="Longitude"
                    placeholder="Enter longitude"
                    value={formData.longitude.toString()}
                    onChange={handleChange("longitude")}
                />
                <TextInput
                    id="positionStatus"
                    label="Position Status"
                    placeholder="Enter position status"
                    value={formData.positionStatus}
                    onChange={handleChange("positionStatus")}
                />

                <CustomButton
                    text="Подтвердить"
                    type="submit"
                    style={{ marginTop: "1rem" }}
                />
            </form>
        </>
    );
}
