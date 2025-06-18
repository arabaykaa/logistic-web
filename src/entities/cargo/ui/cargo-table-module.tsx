import { CustomButton } from "@/shared";
import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomTable = lazy(() => import("@/shared/components/custom-table"))

export default function CargoTableModule() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const columns = [
        { key: "name", label: "Название" },
        { key: "category", label: "Категория" },
    ];

    const data = [
        { id: 1, name: "Элемент 1", category: "A" },
        { id: 2, name: "Элемент 2", category: "B" },
    ];

    const handleAction = (item: any) => {
        alert(`Открыт элемент: ${item.name}`);
    };

    return (
        <CustomTable
            title="Карго"
            columns={columns}
            data={data}
            currentPage={page}
            totalPages={3}
            onPageChange={(p) => setPage(p)}
            onActionClick={handleAction}
            actionComponents={
                <CustomButton
                    text="Добавить +"
                    style={{ width: "fit-content" }}
                    onClick={() => navigate("add-edit")}
                />}
        />
    )
}
