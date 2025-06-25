import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import { lazy, useState, type ChangeEvent, type FormEvent } from "react";
import type { CargoRequestType } from "../model";
import { useNavigate } from "react-router-dom";

const RouteBackButton = lazy(() => import("@/shared/components/route-back-button"))

export default function CargoFormModule() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<CargoRequestType>({
        name: "",
        clientName: "",
        latitude: 0,
        longitude: 0,
        positionStatus: ""
    });

    const handleChange = (field: keyof CargoRequestType) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [field]:
                field === "latitude" || field === "longitude"
                    ? parseFloat(value) || 0
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await apiRequest<CargoRequestType, any>("POST", Path.Containers.create, formData)
            navigate("/cargo")
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <>
            <h2 className="text-[2.25rem] font-semibold mb-4">
                Добавление груза
            </h2>
            <RouteBackButton />
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-[0.5rem] border-1 border-gray-400 flex flex-col gap-4">
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
                    style={{ marginTop: "1rem" }} />
            </form>
        </>
    )
}
