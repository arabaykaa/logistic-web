import { CustomButton, CustomModal } from "@/shared";
import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CargoFilterModal } from "./cargo-filter-modal";
import { columns } from "./constants";
import { useCargoTable } from "../hooks/useCargoActions";

const CustomTable = lazy(() => import("@/shared/components/custom-table"));

export default function CargoTableModule() {
    const { t } = useTranslation()
    const { data, page, setPage, totalPages, error, handleDelete, setFilter } = useCargoTable();
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

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
                onDelete={(id) => handleDelete(id)}
                actionComponents={
                    <div className="flex gap-2">
                        <CustomButton
                            text={t("table.buttons.add")}
                            style={{ width: "fit-content" }}
                            onClick={() => navigate("add")}
                        />
                        <CustomButton
                            text={t("table.buttons.filter")}
                            style={{ width: "fit-content" }}
                            onClick={() => setIsOpen(true)}
                        />
                    </div>
                }
            />
            <CustomModal
                width="50%"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={t("table.filter.title")}
                children={
                    <CargoFilterModal
                        onSubmit={(values) => {
                            setFilter(values);
                            setIsOpen(false);
                        }} />
                }
            />
        </>
    );
}