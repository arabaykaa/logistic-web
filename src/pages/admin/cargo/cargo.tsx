import { CustomButton, CustomTable } from "@/shared";
import { useState } from "react";

export default function Cargo() {
    const [page, setPage] = useState(1);

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
        <div className="pt-12">
            <h2 className="text-[2rem] font-semibold mb-4">
                Карго
            </h2>
            <div className="w-full bg-[green]">
                <CustomButton text="Добавить" style={{ width: "fit-content" }} />
            </div>
            <CustomTable
                title="Классификация: Примеры"
                columns={columns}
                data={data}
                currentPage={page}
                totalPages={3}
                onPageChange={(p) => setPage(p)}
                onActionClick={handleAction} />
        </div>
    )
}
