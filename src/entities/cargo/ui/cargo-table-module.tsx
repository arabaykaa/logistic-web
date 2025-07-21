import { apiRequest, CustomButton, Path } from "@/shared";
import { lazy, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CargoResponseTypeForTable } from "../model";
import type { TableItem } from "@/shared/components/custom-table";
import { useTranslation } from "react-i18next";

const CustomTable = lazy(() => import("@/shared/components/custom-table"));

const LIMIT = 10;

export default function CargoTableModule() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState<TableItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const columns = [
        { key: "clientName", label: "clientName" },
        { key: "containerNumber", label: "containerNumber" },
        { key: "deliveryDate", label: "deliveryDate", type: "date" },
        { key: "createdAt", label: "createdAt", type: "date" },
    ];

    const fetchData = useCallback(async () => {
        try {
            const response = await apiRequest<void, CargoResponseTypeForTable>(
                "GET",
                Path.Containers.getAll({ page: page, limit: LIMIT })
            );
            const mappedData = response.data.map((item) => ({
                ...item,
                id: item._id,
            }));
            setData(mappedData);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Ошибка при загрузке данных");
        }
    }, [page])

    useEffect(() => {
        fetchData();
    }, [page]);

    const deleteItem = async (id: string | number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить этот контейнер?");
        if (!confirmed) return;

        try {
            await apiRequest("DELETE", Path.Containers.delete(id));
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Ошибка при удалении");
        }
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <CustomTable
                title={t("table.title.containers")}
                columns={columns}
                data={data}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
                onEdit={(item) => navigate(`edit/${item.containerNumber}`)}
                onDelete={(id) => deleteItem(id)}
                actionComponents={
                    <CustomButton
                        text={t("table.buttons.add")}
                        style={{ width: "fit-content" }}
                        onClick={() => navigate("add")}
                    />
                }
            />
        </>
    );
}
