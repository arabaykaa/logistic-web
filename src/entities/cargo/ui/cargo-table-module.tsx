import { apiRequest, CustomButton, Path } from "@/shared";
import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CargoResponseType } from "../model";
import type { TableItem } from "@/shared/components/custom-table";

const CustomTable = lazy(() => import("@/shared/components/custom-table"));

export default function CargoTableModule() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<TableItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const columns = [
        { key: "name", label: "Название" },
        { key: "clientName", label: "Клиент" },
        { key: "latitude", label: "Широта" },
        { key: "longitude", label: "Долгота" },
        { key: "positionStatus", label: "Статус" },
        { key: "createdAt", label: "Создано" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                const response = await apiRequest<void, CargoResponseType[]>("GET", Path.Containers.getAll);
                const mappedData = response.map((item) => ({
                    ...item,
                    id: item._id,
                }));

                setData(mappedData);
                // setData(response);
                setError(null);
            } catch (err) {
                setError("Ошибка при загрузке данных");
                console.error(err);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAction = () => {
        alert(`Открыт элемент:`);
    };

    return (
        <div>
            {/* {loading && <p>Загрузка...</p>} */}
            {error && <p className="text-red-500">{error}</p>}

            {/* {!loading && !error && ( */}
            <CustomTable
                title="Карго"
                columns={columns}
                data={data}
                currentPage={page}
                totalPages={1}
                onPageChange={(p) => setPage(p)}
                onActionClick={handleAction}
                actionComponents={
                    <CustomButton
                        text="Добавить +"
                        style={{ width: "fit-content" }}
                        onClick={() => navigate("add-edit")}
                    />
                }
            />
            {/* )} */}
        </div>
    );
}
